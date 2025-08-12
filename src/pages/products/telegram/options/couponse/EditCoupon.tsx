import DatePicker from "@/component/datePicker/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateCouponSchema } from "@/zodSchema/coupon/createCoupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import PlansTable from "../subscriptionPlans/PlansTable";

import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCoupon } from "@/services/coupon";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Coupon } from "@/types/coupon";

export function EditCoupon({
  open,
  close,
  data,
  id,
}: {
  open: boolean;
  close: () => void;
  data?: Coupon;
  id: string;
}) {
  console.log(data);
  const [seletedPlans, setSeletedPlans] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof CreateCouponSchema>>({
    resolver: zodResolver(CreateCouponSchema),
    defaultValues: {
      code: "",
      visibility: "",
      discountType: "percentage",
      discount_rate: "",
      startDate: new Date(),
      endDate: new Date(),
      discountPlans: [],
      usageLimit: "1",
      usageLimitCheck: false,
      usageLimitPerUser: "1",
      usageLimitPerUserCheck: false,
    },
  });

  const createCp = useMutation({
    mutationKey: ["create-coupon"],
    mutationFn: createCoupon,
    onSuccess: () => {
      form.reset();
      toast.success("Coupon created successfully");
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      close();
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  const onSubmit = (cp: z.infer<typeof CreateCouponSchema>) => {
    const payload = {
      package_id: "",
      code: cp.code,
      visibility: cp.visibility,
      discount_type: cp.discountType || "percentage",
      discount_rate: cp.discount_rate || "0",
      start_date: cp.startDate.toISOString(),
      end_date: cp.endDate.toISOString(),
      limit_per_coupon: cp.usageLimit || "1",
      limit_per_user: cp.usageLimitPerUser || "1",
      plan_ids: seletedPlans,
    };
    createCp.mutate(payload);
  };

  const setPlans = (data: string[]) => {
    setSeletedPlans(data);
  };

  useEffect(() => {
    if (data) {
      form.reset({
        code: data.code || "",
        visibility: data.visibility || "public",
        discountType: data.discount_type || "percentage",
        discount_rate: data.discount_rate || "",
        startDate: data.start_date ? new Date(data.start_date) : new Date(),
        endDate: data.end_date ? new Date(data.end_date) : new Date(),
        discountPlans: data?.plans?.map((plan) => plan.id) || [],
        usageLimit: data.limit_per_coupon || "1",
        usageLimitCheck: data.limit_per_coupon > 0 ? true : false,
        usageLimitPerUser: data.limit_per_user || "1",
        usageLimitPerUserCheck: data.limit_per_user > 0 ? true : false,
      });
      console.log("hello");
    }
  }, [data, form]);
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[40vw]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader className="mb-8">
              <DialogTitle>Edit Coupon</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[75vh] md:h-[75vh] w-full">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">1. Coupon Details</p>
                <div className="grid gap-4 grid-cols-2">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <Label htmlFor="code" className="text-base md:text-lg">
                          Coupon Code
                        </Label>
                        <FormControl>
                          <Input
                            id="code"
                            type="text"
                            placeholder="Enter Coupon Code"
                            className="h-10 md:h-10 md:text-base text-base"
                            required
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="visibility"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <Label
                          htmlFor="visibility"
                          className="text-base md:text-lg"
                        >
                          Offer Visibility
                        </Label>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full h-10 md:h-12 md:text-lg text-base">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="private">Private</SelectItem>
                              <SelectItem value="public">Public</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountType"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <Label
                          htmlFor="discountType"
                          className="text-base md:text-lg"
                        >
                          Discount type
                        </Label>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full h-10 md:h-10 md:text-base text-base">
                              <SelectValue placeholder="Select visibility" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="percentage">
                                Precentage %
                              </SelectItem>
                              <SelectItem value="Flat">Flate OFF</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discount_rate"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <Label
                          htmlFor="discount_rate"
                          className="text-base md:text-lg"
                        >
                          discount_rate % or ₹
                        </Label>
                        <FormControl>
                          <Input
                            id="discount_rate"
                            type="text"
                            placeholder="Enter  discount_rate"
                            className="h-10 md:h-10 md:text-base text-base"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <DatePicker name="startDate" form={form} label="Start Date" />
                  <DatePicker name="endDate" form={form} label="End Date" />
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-4">
                <p className="text-lg font-semibold">
                  2. Select in which plans you want add discount
                </p>
                <div className="grid gap-4 grid-cols-1">
                  <Collapsible className="border border-gray-200 rounded-lg p-4">
                    <CollapsibleTrigger>Apply to all plans</CollapsibleTrigger>
                    <CollapsibleContent className="max-h-40 overflow-y-scroll">
                      <PlansTable
                        headers={[
                          "Plan title",
                          "Plan duration",
                          "Date of creation",
                          "plan price",
                        ]}
                        id={id}
                        selectPlans={setPlans}
                        seletedPlans={seletedPlans}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                  <Collapsible className="border border-gray-200 rounded-lg p-4">
                    <CollapsibleTrigger>
                      Apply to specific plans
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <PlansTable
                        headers={[
                          "Plan title",
                          "Plan duration",
                          "Date of creation",
                          "plan price",
                        ]}
                        id={id}
                        selectPlans={setPlans}
                        seletedPlans={seletedPlans}
                      />
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-4 mb-4">
                <p className="text-lg font-semibold">3.Coupon Settings</p>
                <div className="grid gap-2 grid-cols-1">
                  <FormField
                    control={form.control}
                    name="usageLimitCheck"
                    render={({ field }) => {
                      const isChecked = field.value; // watch-like behavior inside render

                      return (
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-3 shadow-sm gap-4">
                          <div className="flex-1">
                            <Label>Usage Limit per coupon</Label>
                            <FormDescription>
                              The total number of times a pariticular coupon can
                              be used across all plans users. Once the limit is
                              reached, the coupon will no longer be available
                              for use.
                            </FormDescription>

                            {isChecked && (
                              <FormField
                                control={form.control}
                                name="usageLimit"
                                render={({ field }) => (
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Enter usage limit per user"
                                      className="mt-2 h-10 md:h-10 md:text-base text-base"
                                      {...field}
                                    />
                                  </FormControl>
                                )}
                              />
                            )}
                          </div>

                          <FormControl>
                            <Switch
                              checked={isChecked}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="usageLimitPerUserCheck"
                    render={({ field }) => {
                      const isChecked = field.value; // watch-like behavior inside render

                      return (
                        <FormItem className="flex flex-row items-start justify-between rounded-lg border p-3 shadow-sm gap-4">
                          <div className="flex-1">
                            <Label>Usage Limit per user</Label>
                            <FormDescription>
                              The number of times an individual user can redeem
                              a specific coupon.
                            </FormDescription>

                            {isChecked && (
                              <FormField
                                control={form.control}
                                name="usageLimitPerUser"
                                render={({ field }) => (
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="Enter usage limit per user"
                                      className="mt-2 h-10 md:h-10 md:text-base text-base"
                                      {...field}
                                    />
                                  </FormControl>
                                )}
                              />
                            )}
                          </div>

                          <FormControl>
                            <Switch
                              checked={isChecked}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </ScrollArea>

            <DialogFooter>
              <DialogClose onClick={close} asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={createCp.isPending}>
                {createCp?.isPending && (
                  <LoaderCircle className="mr-2 animate-spin" />
                )}
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
