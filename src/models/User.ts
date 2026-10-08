import { blood, country, gender, role } from "@/constants/user";
import { IUserWithPassword } from "@/types";
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema<IUserWithPassword>(
  {
    fullName: {
      type: String,
      maxLength: [20, "Name can't be more than 20 characters."],
      required: [true, "Please provide a name."],
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Please provide a username."],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please use a valid email."],
      sparse: true,
    },
    isVerifiedEmail: { type: Boolean, default: false },
    number: { type: String, trim: true },
    isVerifiedNumber: { type: Boolean, default: false },
    password: { type: String, required: [true, "Please provide a password."] },
    avatar: { type: String, default: "" },
    avatarId: { type: String, default: "" },
    gender: { type: String, enum: gender, default: "male" },
    dateOfBirth: Date,
    blood: { type: String, enum: blood, default: "unknown" },
    nationality: { type: String, enum: country, default: "bangladesh" },
    address: String,
    role: { type: String, enum: role, default: "user" },
    identification: {
      birthId: { type: String, trim: true },
      nid: { type: String, trim: true },
    },
  },
  { timestamps: true },
);

const UserModel =
  (mongoose.models.User as mongoose.Model<IUserWithPassword>) ||
  mongoose.model<IUserWithPassword>("User", userSchema);

export default UserModel;
