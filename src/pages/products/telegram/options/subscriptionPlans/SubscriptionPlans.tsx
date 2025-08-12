import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar1, ChartNoAxesCombined, UserRoundCheck } from "lucide-react";
import PlansTable from "./PlansTable";
import { useState } from "react";
import { TableOption } from "./TableOption";
import type { Packages } from "@/types/packages/packages";

export default function Subscription({ data }: { data: Packages }) {
  const [selected, setSelected] = useState("active");
  const handleOptionClick = (option: string) => {
    setSelected(option);
  };
  return (
    <div className="w-full  border-gray-200 rounded-lg p-4 flex flex-col gap-4">
      <div className="w-full grid md:grid-cols-3 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Average reneue/subscription purchased</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div>
              <p className="text-2xl">$5</p>
              <p className="text-base text-gray-600">for this month</p>
            </div>
            <ChartNoAxesCombined className="w-20 h-15 rounded-lg bg-gray-200 p-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Plan with hightest subscriptions sold</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div>
              <p className="text-2xl">89</p>
              <p className="text-base text-gray-600">monthly plan</p>
            </div>
            <UserRoundCheck className="w-20 h-15  rounded-lg text-yellow-500 bg-yellow-200 p-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total subscriptions sold till date</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-between">
            <div>
              <p className="text-2xl">88</p>
              <p className="text-base text-gray-600 ">last sold on 29/7/2025</p>
            </div>
            <Calendar1 className="w-20 h-15  rounded-lg text-purple-500 bg-purple-200 p-2" />
          </CardContent>
        </Card>
      </div>
      <TableOption value={selected} onSelect={handleOptionClick} />

      {selected === "active" && (
        <PlansTable
          headers={[
            "Plan title",
            "Plan duration",
            "Date of creation",
            "plan price",
            "Subscriptions sold and & earnings",
          ]}
          id={data.id}
        />
      )}
      {selected === "inactive" && (
        <PlansTable
          headers={[
            "Plan title",
            "Plan duration",
            "Subscriptions sold and & earnings",
          ]}
          id={data.id}
        />
      )}
    </div>
  );
}
