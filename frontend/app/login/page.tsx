"use client";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { startHolyLoader, stopHolyLoader } from "holy-loader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signInAction } from "../actions";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startHolyLoader();
    setIsLoading(true);

    const res = await signInAction(values);

    setIsLoading(false);
    stopHolyLoader();
    if (res?.error) {
      toast.error(res.error, {
        description: "Please check your email and password",
      });
    }
  };

  return (
    <main className="relative h-screen bg-login-bg bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="relative mx-4 flex h-full items-center justify-center text-white md:mx-auto">
        <div className="flex h-[730px] w-[730px] flex-col items-center rounded-2.5 bg-white/2 p-11 backdrop-blur-[75px]">
          <Logo className="mb-14" width={144} height={66} />
          <Form {...form}>
            <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-11">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g jonathan@email.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                loading={isLoading}
                className="mt-20 w-full bg-sapphire-700 hover:bg-sapphire-800 active:bg-sapphire-900"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Login;
