import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate, useParams } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { LoaderCircle } from "lucide-react";
import { otpSchema } from "@/zodSchema/authSchema";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "@/services/auth";
import { toast } from "sonner";
import useAuthTokenStore from "@/zustand/store";
import { v4 as uuidv4 } from "uuid";

export default function OTP() {
  const navigate = useNavigate();
  const setToken = useAuthTokenStore((state) => state.setToken);
  const { mobile = "" } = useParams();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const verify = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success(`OTP verified successfully`);
      setToken(uuidv4());
      navigate("/dashboard/telegram");
    },
  });

  const otpSumbit = (data: z.infer<typeof otpSchema>) => {
    verify.mutate({
      mobile,
      otp: data.otp,
    });
  };

  return (
    <Card className="w-4/5 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">OTP</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(otpSumbit)}
          >
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your phone{" "}
                    <span className="font-bold text-primary">{mobile}</span>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {verify?.isPending && (
                <LoaderCircle className="mr-2 animate-spin" />
              )}
              Verify Otp
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
