import z from "zod";

// Name Validation ===
export const nameValidation = z
  .string()
  .min(2, "Name must be atleast 2 character")
  .max(30, "Name must be no more than 30 characters")
  .regex(/^[a-zA-Z0-9_ ]+$/, "Name must not contain special character");

export const emailValidation = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email");

export const passwordValidation = z
  .string()
  .min(8, "Password must be atleast 8 characters");

export const dateOfBirthValidation = z
  .string()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => {
      if (!value) return true;

      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);

      return selectedDate <= today;
    },
    { message: "Date of birth cannot be in the future." },
  );

export const accountNameValidation = z.object({
  accountName: z
    .string()
    .trim()
    .min(2, "Account name is required")
    .max(20, "Account name must be 20 characters or fewer"),
});

export const amount = z
  .number()
  .finite("Amount must be a valid number")
  .int("Amount must be a whole number")
  .positive("Amount must be greater than zero")
  .max(1_000_000, "Amount the allowed limit 1 million");

export const month = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Select a valid contribution month");
