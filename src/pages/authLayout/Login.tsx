import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { loginSchema } from "@/zodSchema/authSchema";
import type { CustomError } from "@/types/Error";
import { login } from "@/services/auth";

export default function Login() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: "",
    },
  });
  const otpSend = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success(`OTP send successfully`);
      navigate(`/otp/${form.getValues("mobile")}`);
    },

    onError: (response: CustomError) => {
      toast.error(response?.response?.data?.message || "Something went wrong");
    },
  });

  const onSubmit = (data: { mobile: string }) => {
    otpSend.mutate(data);
  };
  return (
    <Card className="w-4/5 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your Mobile Number</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <Label htmlFor="number">Mobile Number</Label>
                  <FormControl>
                    <Input
                      id="number"
                      type="text"
                      placeholder="Enter your mobile number"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {otpSend?.isPending && (
                <LoaderCircle className="mr-2 animate-spin" />
              )}
              Send OTP
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
