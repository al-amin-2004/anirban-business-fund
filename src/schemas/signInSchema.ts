import z from "zod";
import { emailValidation, passwordValidation } from "./commonSchema";

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
