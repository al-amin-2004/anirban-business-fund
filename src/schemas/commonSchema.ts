import z from "zod";

// Name Validation ===
export const nameValidation = z
  .string()
  .min(2, "Name must be atleast 2 character")
  .max(20, "Name must be no more than 20 characters")
  .regex(/^[a-zA-Z0-9_ ]+$/, "Name must not contain special character");

export const emailValidation = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email");

export const passwordValidation = z
  .string()
  .min(8, "Password must be atleast 8 characters");
