import { z } from "zod";

export const CreateCouponSchema = z.object({
  code: z.string().min(1, "Coupon code is required"),
  visibility: z.string().min(1, "Visibility is required"),
  discount_rate: z.string().optional(),
  discountType: z.string().optional(),
  startDate: z.date().min(new Date(), "Start date must be in the future"),
  endDate: z.date().min(new Date(), "Expiry date must be in the future"),
  discountPlans: z.array(z.string()).optional(),
  usageLimit: z.string().optional(),
  usageLimitPerUser: z.string().optional(),
  usageLimitCheck: z.boolean().optional(),
  usageLimitPerUserCheck: z.boolean().optional(),
});
