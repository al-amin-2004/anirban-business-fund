"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "@/app/_components/ui/Input";
import { Button } from "@/components/ui/button";
import { CheckIcon, UserIcon } from "lucide-react";
import {
  AuthCard,
  AuthDescription,
  AuthFooter,
  AuthHeader,
  AuthTitle,
} from "../_components/ui/AuthCard";

const SignUp = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <AuthCard className="mt-20">
      <AuthHeader>
        <div className="inline-flex justify-center items-center size-16 md:size-12 rounded-full mb-4 ring md:ring-0 ring-primary bg-primary/10 text-primary">
          <UserIcon className="size-10 md:size-7" />
        </div>
        <AuthTitle>Create account</AuthTitle>
        <AuthDescription>Enter your details to get started</AuthDescription>
      </AuthHeader>

      <form className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>

          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="h-11 w-full"
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>

          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="h-11 w-full"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>

          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            className="h-11 w-full"
          />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-2">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="terms"
              required
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="sr-only"
            />
            <label htmlFor="terms" className="flex items-center cursor-pointer">
              <div
                className={`size-4 border border-gray-600 rounded flex items-center justify-center transition-all duration-200 ${
                  isChecked ? "border-primary" : "hover:border-gray-500"
                }`}
              >
                {isChecked && <CheckIcon color="var(--primary)" />}
              </div>
            </label>
          </div>

          <label
            htmlFor="terms"
            className="text-xs text-gray-400 cursor-pointer leading-4"
          >
            I agree to the{" "}
            <Link
              href="/terms-conditions"
              className="text-muted-foreground hover:underline"
            >
              Terms of Service{" "}
            </Link>
            and{" "}
            <Link
              href="/privacy-policy"
              className="text-muted-foreground hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={!isChecked || isLoading}
          className="w-full rounded md:rounded-md"
        >
          {isLoading ? "Sending OTP..." : "Get OTP"}
        </Button>
      </form>

      <AuthFooter>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </AuthFooter>
    </AuthCard>
  );
};

export default SignUp;
