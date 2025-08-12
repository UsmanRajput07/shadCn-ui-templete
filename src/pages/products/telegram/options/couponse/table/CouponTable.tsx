import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCoupons, updateCoupon } from "@/services/coupon";
import type { Coupon } from "@/types/coupon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { EditCoupon } from "../EditCoupon";
import { data } from "react-router";
import { toast } from "sonner";

export default function CouponTable({
  headers = [],
  id,
}: {
  headers: string[];
  id: string;
}) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const coupons = useQuery({
    queryKey: ["coupons"],
    queryFn: () => fetchCoupons({ package_id: id }),
    staleTime: 60 * 10000,
    enabled: !!id,
  });
  const expired = useMutation({
    mutationKey: ["expired"],
    mutationFn: (id: string) =>
      updateCoupon({ id, data: { is_expired: true } }),
    onSuccess: () => {
      toast.success("Coupon Expired Successfully");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    },
  });
  const close = () => setOpen(false);

  const expire = (id: string) => {
    expired.mutate(id);
  };

  return (
    <>
      <EditCoupon
        open={open}
        close={close}
        data={selectedCoupon ? selectedCoupon : undefined}
        id={id}
      />
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons?.data?.map((row: Coupon, rowIndex: number) => (
            <TableRow key={rowIndex}>
              <TableCell>{row?.code}</TableCell>
              <TableCell>{format(row?.start_date, "dd/MM/yyyy")}</TableCell>
              <TableCell
                className={
                  row?.is_expired
                    ? "text-destructive font-bold"
                    : "text-green-400 font-bold"
                }
              >
                {row?.is_expired ? "Expired" : "Active"}
              </TableCell>
              <TableCell>{format(row?.end_date, "dd/MM/yyyy")}</TableCell>
              <TableCell>{row?.visibility}</TableCell>
              <TableCell>
                {row?.discount_rate}
                {row?.discount_type === "percentage" ? "%" : " "} OFF
              </TableCell>
              <TableCell>{row?.discount_type}</TableCell>
              <TableCell>{/* <DetailsDrawer /> */}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical className="w-4 h-6" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedCoupon(row);
                        setOpen(true);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => expire(row.id)}
                    >
                      Expire
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
