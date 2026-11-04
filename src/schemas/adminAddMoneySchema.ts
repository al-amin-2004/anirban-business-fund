import { z } from "zod";

export const adminAddMoneySchema = z.object({
  amount: z
    .number()
    .finite("Amount must be a valid number")
    .int("Amount must be a whole number")
    .positive("Amount must be greater than zero")
    .max(1_000_000, "Amount the allowed limit 1 million"),

  month: z
    .string()
    .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Select a valid contribution month"),
});
