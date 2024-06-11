"use client";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    router.push("/dashboard");
  };

  return (
    <main className="bg-login-bg relative h-screen bg-cover bg-center">
      <div className="absolute inset-0 bg-black opacity-70" />
      <div className="relative mx-4 flex h-full items-center justify-center text-white md:mx-auto">
        <div className="flex h-[730px] w-[730px] flex-col items-center rounded-[10px] bg-white/[0.02] p-11 backdrop-blur-[75px]">
          <Image
            src="/logo.png"
            alt="SCC Logo"
            width={144}
            height={66}
            className="mb-14"
            priority
          />
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
                          className="bg-transparent"
                          placeholder="E.g jonathan@email.com"
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
                          className="bg-transparent"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button
                className="bg-sapphire-700 hover:bg-sapphire-800 active:bg-sapphire-900 mt-20 w-full"
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