import { generateUniqueUsername } from "@/helpers/generateUsername";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import ValidationModel from "@/models/OTPValidation";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { fullName, email, password } = await request.json();

    // Basic validation ===
    if (!fullName || !email || !password) {
      return Response.json(
        { success: false, message: "Name, Email and password are required!" },
        { status: 400 },
      );
    }

    const existingEmail = await UserModel.findOne({ email });

    // Existing user ===
    if (existingEmail) {
      // Already verified ===
      if (existingEmail.isVerifiedEmail) {
        return Response.json(
          { success: false, message: "User already exists with this email." },
          { status: 400 },
        );
      }

      // Existing but email not verified ===
      const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedCode = await bcrypt.hash(verifyCode, 10);
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 2);

      // Remove previous OTP ===
      await ValidationModel.deleteMany({
        userId: existingEmail._id,
      });

      // Create new OTP ===
      await ValidationModel.create({
        userId: existingEmail._id,
        verificationCode: hashedCode,
        expiresAt: expiryDate,
      });

      // Send OTP for existing email ===
      const emailResponse = await sendVerificationEmail(email, verifyCode);
      if (!emailResponse.success) {
        return Response.json(
          { success: false, message: emailResponse.message },
          { status: 500 },
        );
      }

      return Response.json(
        {
          success: true,
          userId: existingEmail._id,
          message: "A new OTP has been sent. Please verify your email.",
        },
        { status: 200 },
      );
    }

    // New user ===
    const username = await generateUniqueUsername(fullName);
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await bcrypt.hash(verifyCode, 10);
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 2);

    // Create user ===
    const createNewUser = await UserModel.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      isVerifiedEmail: false,
    });

    // Create OTP ===
    await ValidationModel.create({
      userId: createNewUser._id,
      verificationCode: hashedCode,
      expiresAt: expiryDate,
    });

    // Send OTP ===
    const emailResponse = await sendVerificationEmail(email, verifyCode);
    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 },
      );
    }

    return Response.json(
      {
        success: true,
        userId: createNewUser._id,
        message: "OTP sent. Please verify your email.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user!", error);

    return Response.json(
      { success: false, message: "Error registering user!" },
      { status: 500 },
    );
  }
}
