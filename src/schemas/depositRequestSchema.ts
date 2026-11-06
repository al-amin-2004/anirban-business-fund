import z from "zod";
import { paymentMethods } from "@/constants/account";
import { amount, month } from "./commonSchema";

export const depositRequestSchema = z.object({
  amount: amount,
  month: month,
  method: z.enum(paymentMethods, { error: "Please select a payment method" }),
  transactionId: z
    .string()
    .trim()
    .min(3, "Transaction ID is too short")
    .max(70, "Transaction ID too long"),
  note: z.string().optional(),
});
