"use client";

import Link from "next/link";
import Input from "@/app/_components/ui/Input";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
  AuthCard,
  AuthDescription,
  AuthFooter,
  AuthHeader,
  AuthTitle,
} from "../_components/ui/AuthCard";

const SignIn = () => {
  return (
    <AuthCard className="mt-20">
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
      <form className="space-y-5">
        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>

          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            className="h-11 w-full"
          />
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

          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="h-11 w-full"
          />
        </div>

        {/* Submit */}
        <Button type="submit" className="h-11 w-full font-semibold">
          Sign In
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
