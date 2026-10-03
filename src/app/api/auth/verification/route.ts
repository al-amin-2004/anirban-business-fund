import dbConnect from "@/lib/dbConnect";
import ValidationModel from "@/models/OTPValidation";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const jwtSecret = process.env.JWT_SECRET;

export async function POST(req: Request) {
  try {
    await dbConnect();

    // Bring userId, verify code from varification page ===
    const { userId, otp } = await req.json();
    if (!userId || !otp) {
      return Response.json(
        { success: false, message: "UserId and OTP are required!" },
        { status: 400 },
      );
    }

    // Find user in databse with userId ===
    const user = await UserModel.findById(userId);
    if (!user) {
      return Response.json(
        { success: false, message: "User not found." },
        { status: 404 },
      );
    }

    // Find OTP Data in database with userId ===
    const otpData = await ValidationModel.findOne({ userId });
    if (!otpData) {
      return Response.json(
        { success: false, message: "No verification record found." },
        { status: 404 },
      );
    }

    // Matching OTP for verify ===
    const isMatch = await bcrypt.compare(otp, otpData.verificationCode);
    if (!isMatch) {
      return Response.json(
        { success: false, message: "Invalid verification OTP." },
        { status: 400 },
      );
    }

    // If OTP matched, email verify true ===
    user.isVerifiedEmail = true;
    await user.save();

    // Delete OTP record ===
    await ValidationModel.deleteOne({ userId });

    // Token set with JWT in cookie ===
    if (!jwtSecret) throw new Error("JWT_SECRET is not defiend!");
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: "40d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 40 * 24 * 60 * 60,
      path: "/",
      priority: "high",
    });

    return Response.json(
      { success: true, message: "Email verified successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Verification error:", error);
    return Response.json(
      { success: false, message: "Server error." },
      { status: 500 },
    );
  }
}
