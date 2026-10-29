import z from "zod";
import { updateProfileSchema } from "./UpdateProfileSchema";
import { emailValidation } from "./commonSchema";

export const adminUpdateUserSchema = updateProfileSchema.extend({
  email: emailValidation,
  number: z.string().max(15),
  username: z.string().min(5),

  avatarId: z.string().optional(),

  isVerifiedEmail: z.boolean(),
  isVerifiedNumber: z.boolean(),
});
