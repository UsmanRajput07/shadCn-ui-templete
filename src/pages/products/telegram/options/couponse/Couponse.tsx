import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePercent, Calendar1, ChartNoAxesCombined } from "lucide-react";
import { CreateCoupon } from "./CreateCoupon";
import type { Packages } from "@/types/packages/packages";
import CouponTable from "./table/CouponTable";

export default function Couponse({ data }: { data: Packages }) {
  return (
    <div className="w-full  border-gray-200 rounded-lg p-4 flex flex-col gap-4">
      <div className="w-full grid md:grid-cols-3 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Unique active coupons created to date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div>
              <p className="text-2xl">$5</p>
              <p className="text-base text-gray-600">for this month</p>
            </div>
            <BadgePercent className="w-20 h-15 rounded-lg bg-gray-100 p-2 text-yellow-500" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Couponse used till date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div>
              <p className="text-2xl">89</p>
              <p className="text-base text-gray-600">monthly plan</p>
            </div>
            <Calendar1 className="w-20 h-15  rounded-lg text-purple-500 bg-purple-200 p-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue from coupon redemption</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div>
              <p className="text-2xl">88</p>
              <p className="text-base text-gray-600 ">last sold on 29/7/2025</p>
            </div>
            <ChartNoAxesCombined className="w-20 h-15 rounded-lg bg-gray-200 p-2" />
          </CardContent>
        </Card>
      </div>
      <div className="w-full flex justify-between">
        <div>
          <p className="text-lg font-semibold">All coupons</p>
        </div>
        <div>
          <CreateCoupon data={data} />
        </div>
      </div>
      <CouponTable
        headers={[
          "Coupon code",
          "start date",
          "End date",
          "status",
          "discount OFF",
          "Coupon Type",
          "Applied pricing",
        ]}
        id={data?.id}
      />
    </div>
  );
}
