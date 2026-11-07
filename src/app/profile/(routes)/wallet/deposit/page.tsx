"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { PaymentMethods } from "@/types";
import { useForm } from "react-hook-form";
import { depositRequestSchema } from "@/schemas/depositRequestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccounts } from "@/providers/AccountContext";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { cn } from "cn";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import Input from "@/app/_components/ui/Input";
import z from "zod";
import {
  Send,
  CreditCard,
  CircleCheck,
  CheckCircle2,
  Check,
  Copy,
} from "lucide-react";
import {
  BankIcon,
  BkashIcon,
  CreditCardIcon,
  NagadIcon,
  RocketIcon,
} from "@/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PaymentMethodProps {
  id: PaymentMethods;
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const paymentMethods: PaymentMethodProps[] = [
  {
    id: "bkash",
    name: "BKash",
    description: "Mobile banking",
    icon: BkashIcon,
  },
  {
    id: "nagad",
    name: "Nagad",
    description: "Mobile banking",
    icon: NagadIcon,
  },
  {
    id: "rocket",
    name: "Rocket",
    description: "Mobile banking",
    icon: RocketIcon,
  },
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Direct bank payment",
    icon: BankIcon,
  },
  {
    id: "card",
    name: "Card Transfer",
    description: "Direct bank payment",
    icon: CreditCardIcon,
  },
];

type DepositFormData = z.infer<typeof depositRequestSchema>;

const Page = () => {
  const router = useRouter();
  const { activeAccount } = useAccounts();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [successOpen, setSuccessOpen] = useState<boolean>(false);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DepositFormData>({
    resolver: zodResolver(depositRequestSchema),
    mode: "onTouched",
    defaultValues: {
      amount: 200,
      method: "bkash",
      month: currentMonth,
      transactionId: "",
      note: "",
    },
  });

  const selectedPaymentMethod = watch("method");

  const onSubmit = async (values: DepositFormData) => {
    setSubmitting(true);

    try {
      const res = await fetch("/api/requests/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: activeAccount?._id,
          requestType: "deposit",
          ...values,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.add({
          type: "success",
          description: data.message || "Deposit request failed",
        });
      }

      reset();
      setSuccessOpen(true);
    } catch (error) {
      toast.add({
        type: "error",
        description: `Deposit request failed: ${error}`,
      });
      console.error("Deposit request failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 pb-4">
      {/* Page heading */}
      <PagesTitle
        title="Deposit Funds"
        description="Add money to your ABF wallet securely."
      />

      {/* Deposit Form */}
      <section className="rounded-2xl border p-4 shadow-sm sm:p-6 lg:p-7">
        <div className="mb-4 flex items-center gap-3 border-b pb-3">
          <CreditCard size={24} className="text-[#075638]" />
          <h3 className="text-lg font-bold sm:text-xl">Deposit Information</h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Amount */}
          <div className="space-y-2">
            <label htmlFor="amount">
              Amount <span className="text-destructive">*</span>
            </label>
            <Input
              id="amount"
              type="number"
              min="1"
              step="0.01"
              required
              placeholder="Enter amount (e.g. 200)"
              {...register("amount", { valueAsNumber: true })}
            />
            {errors.amount && (
              <ErrorMessage>{errors.amount.message}</ErrorMessage>
            )}
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label>
              Payment Method <span className="text-destructive">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                const selected = selectedPaymentMethod === method.id;

                return (
                  <button
                    key={method.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() =>
                      setValue("method", method.id, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                    className={cn(
                      "relative mt-1.5 flex min-h-16 sm:min-h-26 sm:flex-col items-center justify-center gap-2 rounded-xl border p-3 transition bg-white hover:border-emerald-300 hover:bg-emerald-50/30 cursor-pointer",
                      {
                        "bg-emerald-50 ring-3 ring-emerald-600": selected,
                      },
                    )}
                  >
                    {selected && (
                      <CircleCheck className="absolute right-2.5 top-2.5 size-5 rounded-full bg-emerald-700" />
                    )}

                    <Icon />

                    <div className="text-center">
                      <p className="text-xs font-bold text-slate-800 sm:text-sm">
                        {method.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground sm:text-xs">
                        {method.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.method && (
              <ErrorMessage>{errors.method.message}</ErrorMessage>
            )}
          </div>

          {/* Payment Information */}
          {selectedPaymentMethod && (
            <div className="mt-4 overflow-hidden rounded-xl border">
              {/* Payment Info Heading */}
              <div className="flex items-center justify-between border-b px-3 py-2">
                <div>
                  <h3 className="text-sm">Payment Information</h3>
                  <p className="text-xs text-muted-foreground">
                    Send your payment to the following account
                  </p>
                </div>

                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold capitalize border bg-primary/30 border-primary",
                    {
                      "bg-pink-500/30 border-pink-600 text-pink-500":
                        selectedPaymentMethod === "bkash",
                    },
                    {
                      "bg-orange-500/30 border-orange-600 text-orange-500":
                        selectedPaymentMethod === "nagad",
                    },
                    {
                      "bg-purple-500/30 border-purple-600 text-purple-500":
                        selectedPaymentMethod === "rocket",
                    },
                  )}
                >
                  {selectedPaymentMethod}
                </span>
              </div>

              <div className="space-y-2 p-3">
                {(selectedPaymentMethod === "bkash" ||
                  selectedPaymentMethod === "nagad" ||
                  selectedPaymentMethod === "rocket") && (
                  <>
                    <PaymentInfoRow
                      label="Account Name"
                      value="Anirban Business Fund"
                    />
                    <PaymentInfoRow
                      label={`${selectedPaymentMethod} Number (Personal)`}
                      value="01609305655"
                      copy
                    />
                  </>
                )}

                {selectedPaymentMethod === "bank" && (
                  <p className="text-center">This service not available now.</p>
                )}

                {selectedPaymentMethod === "card" && (
                  <p className="text-center">This service not available now.</p>
                )}

                <div className="rounded-lg bg-emerald-100/10 p-3">
                  <p className="font-semibold text-destructive">
                    Important Instructions
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Please send the exact amount to the account above and enter
                    the correct Transaction ID in the deposit form.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Transaction */}
          <div className="space-y-2">
            <label htmlFor="transactionId">
              Transaction Reference <span className="text-destructive"> *</span>
            </label>

            <Input
              placeholder="Enter Transaction ID / Reference Number"
              id="transactionId"
              type="text"
              required
              {...register("transactionId")}
            />
            {errors.transactionId && (
              <ErrorMessage>{errors.transactionId.message}</ErrorMessage>
            )}
          </div>

          {/* Contibuter Month */}
          <div className="space-y-2">
            <label htmlFor="month">
              Contibuter month <span className="text-destructive"> *</span>
            </label>

            <Input id="month" type="month" required {...register("month")} />
            {errors.month && (
              <ErrorMessage>{errors.month.message}</ErrorMessage>
            )}
          </div>

          {/* Note */}
          <div className="space-y-2">
            <label htmlFor="note">
              Additional Note{" "}
              <span className="font-normal text-xs text-muted-foreground">
                (Optional)
              </span>
            </label>

            <textarea
              id="note"
              rows={3}
              placeholder="Write something about your deposit..."
              {...register("note")}
              className="min-h-28 w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
            {errors.note && <ErrorMessage>{errors.note.message}</ErrorMessage>}
          </div>

          {/* Submit */}
          <Button
            variant="primary"
            type="submit"
            disabled={submitting}
            className="w-full"
          >
            <Send size={18} />
            {submitting ? "Processing..." : "Submit Deposit Request"}
          </Button>
        </form>
      </section>

      <p className="text-center text-xs text-slate-400">
        Your deposit will be reviewed by the ABF administration.
      </p>

      <Dialog
        open={successOpen}
        onOpenChange={(open) => {
          if (open) setSuccessOpen(true);
        }}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <div className="flex justify-center">
              <CheckCircle2 className="size-12 text-primary" />
            </div>

            <DialogTitle className="text-center">
              Deposit Request Submitted!
            </DialogTitle>

            <DialogDescription className="text-center">
              Your deposit request is waiting for admin approval.
            </DialogDescription>
          </DialogHeader>

          <Button onClick={() => router.push("/profile/wallet")}>
            Back to Wallet
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;

interface PaymentInfoRow {
  label: string;
  value: string;
  copy?: boolean;
}
const PaymentInfoRow: FC<PaymentInfoRow> = ({ label, value, copy = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      console.error("Failed to copy");
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg px-2 py-1">
      <div>
        <p className="text-xs text-muted-foreground capitalize">{label}</p>
        <p className="truncate text-sm font-semibold">{value}</p>
      </div>

      {copy && (
        <button
          type="button"
          onClick={handleCopy}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100 cursor-pointer"
          aria-label={`Copy ${label}`}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      )}
    </div>
  );
};
