import { z } from "zod";

export const loginSchema = z.object({
  mobile: z
    .string()
    .min(10, { message: "Mobile Number must be at least 10 characters" })
    .max(10, { message: "Mobile Number not be more than 10 characters" })
    .trim(),
});

export const otpSchema = z.object({
  mobile: z.string().optional(),
  otp: z.string().min(6, { message: "OTP must be at least 6 characters" }),
});
