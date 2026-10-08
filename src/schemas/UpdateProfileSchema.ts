import z from "zod";
import { dateOfBirthValidation, nameValidation } from "./commonSchema";

export const updateProfileSchema = z.object({
  fullName: nameValidation,
  gender: z.string().min(1, "Please select your gender"),
  dateOfBirth: dateOfBirthValidation,
  blood: z.string().min(1, "Please select your blood group"),
  nationality: z.string().min(1, "Please select your nationality"),
  address: z.string().optional().or(z.literal("")),
});
