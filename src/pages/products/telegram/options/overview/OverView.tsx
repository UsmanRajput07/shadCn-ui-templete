import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar1,
  Landmark,
  ShoppingCart,
  UserRoundCheck,
} from "lucide-react";
import SalesInSights from "./SalesInSights";
import type { Packages } from "@/types/packages/packages";
import { useQuery } from "@tanstack/react-query";
import { fetchPackageDeatails } from "@/services/packages/packages";

export default function OverView({ data }: { data: Packages }) {
  const { data: overview } = useQuery({
    queryKey: ["package-overview", data?.id],
    queryFn: () => fetchPackageDeatails({ package_id: data.id }),
    enabled: !!data?.id,
  });
  return (
    <>
      <div className="grid md:grid-cols-4 lg:grid-cols-4 gap-4 px-2">
        <Card>
          <CardHeader className="px-4 m-0 py-0">
            <CardTitle className="p-0 m-0">
              <div className="flex gap-8">
                <Landmark className="w-20 h-20  rounded-lg text-green-500 bg-green-200 p-2" />
                <div>
                  <p className="text-lg">{overview?.total_amount}</p>
                  <p className="text-base">Total Earning</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="px-4 m-0 py-0">
            <CardTitle className="p-0 m-0">
              <div className="flex gap-8">
                <ShoppingCart className="w-20 h-20  rounded-lg text-blue-500 bg-blue-200 p-2" />
                <div>
                  <p className="text-lg">{overview?.total_purchase}</p>
                  <p className="text-base">Total Purchase</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="px-4 m-0 py-0">
            <CardTitle className="p-0 m-0">
              <div className="flex gap-8">
                <UserRoundCheck className="w-20 h-20  rounded-lg text-yellow-500 bg-yellow-200 p-2" />
                <div>
                  <p className="text-lg">{overview?.total_active_user}</p>
                  <p className="text-base">Total Users</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="px-4 m-0 py-0">
            <CardTitle className="p-0 m-0">
              <div className="flex gap-8">
                <Calendar1 className="w-20 h-20  rounded-lg text-purple-500 bg-purple-200 p-2" />
                <div>
                  <p className="text-lg">{overview?.total_expired_user}</p>
                  <p className="text-base">Total Expired</p>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <SalesInSights />
    </>
  );
}
