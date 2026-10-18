import mongoose from "mongoose";
import { getAuthUser } from "@/helpers/getUser";
import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";
import UserModel from "@/models/User";
import { generateUniqueAccountNumber } from "@/helpers/generateAccountNumber";

export async function POST(req: Request) {
  const auth = await getAuthUser();

  if (!auth.success) {
    return Response.json(
      { success: false, message: auth.message },
      { status: auth.status },
    );
  }

  if (auth.role !== "admin") {
    return Response.json(
      { success: false, message: "Forbidden" },
      { status: 403 },
    );
  }

  try {
    await dbConnect();

    const { userId, accName, identification } = await req.json();
    if (!userId || !accName.trim() || !identification) {
      return Response.json(
        { success: false, message: "Missing data" },
        { status: 400 },
      );
    }

    // Validate user ID
    if (!mongoose.isValidObjectId(userId)) {
      return Response.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 },
      );
    }

    // Validate account
    if (
      typeof accName !== "string" ||
      accName.trim().length < 2 ||
      accName.trim().length > 20
    ) {
      return Response.json(
        { success: false, message: "Account name must be 2–20 characters" },
        { status: 400 },
      );
    }

    // Validate identification
    const birthId =
      typeof identification?.birthId === "string"
        ? identification.birthId.trim()
        : "";

    const nid =
      typeof identification?.nid === "string" ? identification.nid.trim() : "";

    if (!birthId && !nid) {
      return Response.json(
        { success: false, message: "NID or Birth ID is required" },
        { status: 400 },
      );
    }

    const dob =
      typeof identification?.dateOfBirth === "string"
        ? identification.dateOfBirth
        : "";

    if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      return Response.json(
        { success: false, message: "A valid date of birth is required" },
        { status: 400 },
      );
    }

    const dateOfBirth = new Date(`${dob}T00:00:00.000Z`);

    if (
      Number.isNaN(dateOfBirth.getTime()) ||
      dateOfBirth.toISOString().slice(0, 10) !== dob ||
      dateOfBirth > new Date()
    ) {
      return Response.json(
        { success: false, message: "Invalid date of birth" },
        { status: 400 },
      );
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    if (user.role !== "user") {
      return Response.json(
        { success: false, message: "User is not eligible for an account" },
        { status: 409 },
      );
    }

    const trimedName = accName.trim();

    const existingAccountName = await AccountModel.findOne({
      userId,
      accName: trimedName,
    });
    if (existingAccountName) {
      return Response.json(
        { success: false, message: "You have already This account name" },
        { status: 400 },
      );
    }

    const accNumber = await generateUniqueAccountNumber();

    // Create new Account ===
    await AccountModel.create({
      userId,
      accName: trimedName,
      accNumber,
      identification: { birthId, nid, dateOfBirth },
    });

    user.role = "member";
    await user.save();

    return Response.json(
      { success: true, message: "Account created successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create account API error:", error);
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
