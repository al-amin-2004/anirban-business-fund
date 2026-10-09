"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import { toast } from "@/components/ui/toast";
import { EyeIcon, EyeOffIcon, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Input from "@/app/_components/ui/Input";
import z from "zod";
import {
  AuthCard,
  AuthDescription,
  AuthFooter,
  AuthHeader,
  AuthTitle,
} from "../_components/ui/AuthCard";

type SigninFormData = z.infer<typeof signInSchema>;

const SignIn = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (formData: SigninFormData) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.add({
          type: "error",
          description: data.message || "Signin Failed",
        });
        return;
      }

      toast.add({ type: "success", description: data.message });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.add({
        type: "error",
        description: "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard className="mt-24">
      {/* Header */}
      <AuthHeader>
        <div className="inline-flex justify-center items-center size-16 md:size-12 rounded-full mb-4 ring md:ring-0 ring-primary bg-primary/10 text-primary">
          <LogIn className="size-7" />
        </div>

        <AuthTitle>Welcome Back</AuthTitle>

        <AuthDescription>
          Sign in to continue to your Anirban Business Fund account.
        </AuthDescription>
      </AuthHeader>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>

          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            className="h-11"
          />

          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="h-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button type="submit" className="h-11 w-full font-semibold">
          {isLoading ? "Checking..." : "Sign in"}
        </Button>
      </form>

      {/* Footer */}
      <AuthFooter>
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </AuthFooter>
    </AuthCard>
  );
};

export default SignIn;
