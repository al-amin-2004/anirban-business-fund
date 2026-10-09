"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { emailMasking } from "@/helpers/EmailMasking";
import { Loader2, ShieldCheck } from "lucide-react";
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
import { toast } from "@/components/ui/toast";
import { formatTime } from "@/helpers/formatTime";

const Verification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [otp, setOtp] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [seconds, setSeconds] = useState<number>(0);

  const userId = searchParams.get("userId");

  // Get Email
  useEffect(() => {
    const getInfo = async () => {
      try {
        const res = await fetch("/api/auth/getValidationOtp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.add({ type: "error", description: data.message });
        }

        setEmail(data.email);
        setExpiresAt(data.expiresAt);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) getInfo();
  }, [userId]);

  // date to second convert
  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      const remaining = Math.floor(
        (new Date(expiresAt).getTime() - new Date().getTime()) / 1000,
      );

      setSeconds(remaining > 0 ? remaining : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  const handleVerify = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.add({
          type: "info",
          description: data.message || "Something went wrong!",
        });
        return;
      }

      toast.add({
        title: "Success",
        description: data.message,
        type: "success",
        timeout: 1500,
      });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.add({ type: "error", description: "Server error" });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <AuthCard className="mt-24 w-full space-y-6 p-6 md:max-w-md">
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
        <Button
          onClick={handleVerify}
          disabled={isLoading}
          type="button"
          className="w-full flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="animate-spin size-4" />}
          {isLoading ? "Verifying..." : "Verify OTP"}
        </Button>

        {/* Resend OTP */}
        <button
          type="button"
          disabled={seconds > 0}
          className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline disabled:cursor-wait"
        >
          {seconds > 0 ? `Resend OTP in ${formatTime(seconds)}s` : "Resend OTP"}
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
