import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function EarnChart() {
  return (
    <Card>
      <div className="flex items-center justify-between px-4">
        <p className="text-base font-semibold">Earnings and puchases</p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Group</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="user">User Type</SelectItem>
              <SelectItem value="currency">Currency</SelectItem>
              <SelectItem value="other">other Type</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <RadioGroup defaultValue="option-one" className="p-4 flex gap-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="earning" id="earning" />
          <Label htmlFor="earning" className="text-base">
            Earnings
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="purchases" id="purchases" />
          <Label htmlFor="purchases" className="text-base">
            Purchases
          </Label>
        </div>
      </RadioGroup>
      <ChartContainer config={chartConfig} className="max-h-[40vh] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <YAxis tickLine={false} axisLine={false} />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
