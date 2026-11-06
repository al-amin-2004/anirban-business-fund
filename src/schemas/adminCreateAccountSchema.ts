import z from "zod";

export const adminCreateAccountSchema = z
  .object({
    accName: z
      .string()
      .trim()
      .min(2, "Account name must be at least 2 characters")
      .max(30, "Account name cannot exceed 30 characters"),

    identification: z.object({
      birthId: z.string().trim(),
      nid: z.string().trim(),
      dateOfBirth: z.string().min(1, "Date of birth is required"),
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.identification.birthId && !data.identification.nid) {
      ctx.addIssue({
        code: "custom",
        path: ["identification", "nid"],
        message: "NID or Birth ID is required",
      });
    }
  });
