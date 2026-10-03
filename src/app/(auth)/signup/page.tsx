"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { CheckIcon, EyeIcon, EyeOffIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import z from "zod";
import Input from "@/app/_components/ui/Input";
import {
  AuthCard,
  AuthDescription,
  AuthFooter,
  AuthHeader,
  AuthTitle,
} from "../_components/ui/AuthCard";
import { toast } from "@/components/ui/toast";

type SignUpFormData = z.infer<typeof signupSchema>;

const SignUp = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (formData: SignUpFormData) => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.add({
          type: "error",
          description: data.message || "Something Worng!",
        });
      } else {
        toast.add({ type: "success", description: data.message });
        router.push(`verification?userId=${data.userId}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthCard className="mt-20">
      <AuthHeader>
        <div className="inline-flex justify-center items-center size-16 md:size-12 rounded-full mb-4 ring md:ring-0 ring-primary bg-primary/10 text-primary">
          <UserIcon className="size-10 md:size-7" />
        </div>
        <AuthTitle>Create account</AuthTitle>
        <AuthDescription>Enter your details to get started</AuthDescription>
      </AuthHeader>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>

          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
            className="h-11 w-full"
          />
          {errors.fullName && (
            <p className="text-sm text-destructive">
              {errors.fullName.message}
            </p>
          )}
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
            {...register("email")}
            className="h-11 w-full"
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              {...register("password")}
              className="h-11 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 text-gray-500 md:hover:text-gray-300 transition-colors"
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
