import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SalesInSightsSchema } from "@/zodSchema/SalesInSights";
import { endOfMonth, format, startOfMonth } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {EarnChart} from "./EarnChart";

export default function SalesInSights() {
  const form = useForm({
    resolver: zodResolver(SalesInSightsSchema),
    defaultValues: {
      plan: "all-plans",
      dateRange: {
        from: startOfMonth(new Date()),
        to: endOfMonth(new Date()),
      },
    },
  });

  return (
    <div className="px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold ">Revenue and sales insights</p>
        </div>
        <div className="flex gap-4">
          <Form {...form}>
            <form className="flex gap-4 py-2">
              <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder={field.value} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="all-plans">All plans</SelectItem>
                            <SelectItem value="Half-Yearly-plan-180-days">
                              Half-Yearly plan 180 days
                            </SelectItem>
                            <SelectItem value="quarterly">
                              Quarterly Plan 90 days
                            </SelectItem>
                            <SelectItem value="monthly">
                              Monthly Plan 30 days
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value?.from && "text-muted-foreground"
                            )}
                          >
                            {field.value?.from ? (
                              field.value.to ? (
                                `${format(
                                  field.value.from,
                                  "LLL dd, y"
                                )} - ${format(field.value.to, "LLL dd, y")}`
                              ) : (
                                format(field.value.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Pick a date range</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          selected={field.value}
                          onSelect={field.onChange}
                          numberOfMonths={1}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <EarnChart />
    </div>
  );
}
