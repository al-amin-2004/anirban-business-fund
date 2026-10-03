import z from "zod";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "./commonSchema";

export const signupSchema = z.object({
  fullName: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});
