import z from "zod";

export const adminUpdateAccountSchema = z.object({
  accName: z.string().min(2).max(20),
  accNumber: z.string().length(10, "Account number must be 10 digits"),

  identification: z.object({
    birthId: z.string().optional(),
    nid: z.string().optional(),
    dateOfBirth: z.string(),
  }),
});
