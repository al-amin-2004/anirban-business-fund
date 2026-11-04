"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { IAccount } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { DialogInfoRow } from "../DialogInfoRow";
import { adminAddMoneySchema } from "@/schemas/adminAddMoneySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import Input from "@/app/_components/ui/Input";
import z from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DepositProps {
  account: IAccount | null;
  open: boolean;
  onClose: () => void;
}

type FormData = z.infer<typeof adminAddMoneySchema>;

const Deposit: FC<DepositProps> = ({ account, open, onClose }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(adminAddMoneySchema),
    defaultValues: {
      amount: 200,
      month: currentMonth,
    },
  });

  if (!account) return null;

  const onSubmit = async (values: FormData) => {
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/accounts/deposit", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: account._id,
          amount: values.amount,
          month: values.month,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.add({
          type: "error",
          description: data.message || "Something wrong",
        });
        return;
      }

      reset();
      onClose();
      toast.add({
        type: "success",
        description: `৳${values.amount.toLocaleString()} deposited successfully.`,
      });
    } catch (error) {
      console.error(error);
      toast.add({ type: "error", description: (error as Error).message });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="border-b pb-2.5">
          <DialogTitle>Add Money</DialogTitle>
          <DialogDescription className="text-xs">
            Record a deposit received from this member. Verify the payment
            before confirming.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 mb-6">
            {/* ===== ACCOUNT INFO ===== */}
            <div className="rounded-lg border p-3 text-sm space-y-1">
              <DialogInfoRow label="Account Name" value={account.accName} />
              <DialogInfoRow label="Account Number" value={account.accNumber} />
            </div>

            {/* ===== AMOUNT ===== */}
            <div>
              <label className="text-sm font-medium">Amount</label>
              <Input
                type="number"
                placeholder="Enter deposit amount"
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <ErrorMessage>{errors.amount.message}</ErrorMessage>
              )}
            </div>

            {/* ===== MONTH ===== */}
            <div>
              <label className="text-sm font-medium">Month</label>
              <Input type="month" {...register("month")} />
              {errors.month && (
                <ErrorMessage>{errors.month.message}</ErrorMessage>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />

            <Button type="submit" disabled={submitting}>
              {submitting ? "Processing..." : "Money Deposit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Deposit;
