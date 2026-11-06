import { z } from "zod";
import { amount, month } from "./commonSchema";

export const adminAddMoneySchema = z.object({
  amount: amount,
  month: month,
});
