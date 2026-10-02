"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { emailMasking } from "@/helpers/EmailMasking";
import { ShieldCheck } from "lucide-react";
import {
  AuthCard,
  AuthDescription,
  AuthFooter,
  AuthHeader,
  AuthTitle,
} from "../_components/ui/AuthCard";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const Verification = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  return (
    <AuthCard className="mt-20 w-full space-y-6 p-6 md:max-w-md">
      <AuthHeader>
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="size-7" />
        </div>

        <AuthTitle>Verify Your Email</AuthTitle>

        <AuthDescription>
          Enter the 6-digit verification code sent to
          <br />
          <span className="font-medium text-foreground">
            {email && emailMasking(email)}
          </span>
        </AuthDescription>
      </AuthHeader>

      <div className="flex flex-col items-center gap-5">
        {/* OTP Input */}
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>

          <InputOTPSeparator />

          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>

          <InputOTPSeparator />

          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        {/* OTP Error — validation/API error later */}
        {error && (
          <p className="text-center text-sm text-destructive">{error}</p>
        )}

        {/* Verify Button */}
        <Button type="button" className="w-full">
          Verify Email
        </Button>

        {/* Resend OTP */}
        <button
          type="button"
          className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline"
        >
          Resend OTP
        </button>
      </div>

      <AuthFooter className="text-center">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-sm font-medium text-primary hover:underline"
        >
          Change email
        </button>
      </AuthFooter>
    </AuthCard>
  );
};

export default Verification;
