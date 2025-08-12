import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { fetchPlans } from "@/services/packages/packages";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState, useEffect } from "react";

type Plan = {
  id: string;
  features: string;
  duration: string;
  created_at: string;
  price: number;
};

export default function PlansTable({
  headers = [],
  id,
  selectPlans,
  seletedPlans,
}: {
  headers: string[];
  id: string;
  selectPlans?: (ids: string[]) => void;
  seletedPlans?: string[];
}) {
  console.log(seletedPlans);
  const { data: plans } = useQuery({
    queryKey: ["plans"],
    queryFn: () => fetchPlans({ package_id: id }),
    staleTime: 60 * 10000,
  });

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (selectPlans) {
      selectPlans(selectedIds);
    }
  }, [selectedIds]);

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(plans?.map((p: Plan) => p.id) || []);
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* Checkbox Header */}
          <TableHead>
            <Checkbox
              checked={
                selectedIds.length > 0 && selectedIds.length === plans?.length
                  ? true
                  : selectedIds.length > 0
                  ? "indeterminate"
                  : false
              }
              onCheckedChange={(value) => toggleSelectAll(!!value)}
            />
          </TableHead>

          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {plans?.map((row: Plan) => (
          <TableRow key={row.id}>
            {/* Row checkbox */}
            <TableCell>
              <Checkbox
                checked={selectedIds.includes(row.id)}
                onCheckedChange={(value) => toggleSelectOne(row.id, !!value)}
              />
            </TableCell>

            <TableCell>{row?.features?.split("\\n")[0]}</TableCell>
            <TableCell>{row.duration} Month Plan</TableCell>
            <TableCell>{format(row.created_at, "dd/MM/yyyy")}</TableCell>
            <TableCell>{Math.round(row.price)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
