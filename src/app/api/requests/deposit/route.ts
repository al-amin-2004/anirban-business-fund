import dbConnect from "@/lib/dbConnect";
import { getAuthUser } from "@/helpers/getUser";

import AccountModel from "@/models/Account";
import { paymentMethods } from "@/constants/account";
import RequestModel from "@/models/request";

export async function POST(request: Request) {
  try {
    await dbConnect();

    // Authenticate user ===
    const auth = await getAuthUser();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    const {
      accountId,
      amount,
      method,
      month,
      transactionId,
      note,
      requestType,
    } = await request.json();

    if (
      !accountId ||
      !month ||
      !amount ||
      !method ||
      !transactionId ||
      !requestType
    ) {
      return Response.json(
        { success: false, message: "Invalid deposit information" },
        { status: 400 },
      );
    }

    // Request type validation ===
    if (requestType !== "deposit") {
      return Response.json(
        { success: false, message: "Invalid request type" },
        { status: 400 },
      );
    }

    // Amount validation ===
    if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 1) {
      return Response.json(
        { success: false, message: "Please enter a valid deposit amount" },
        { status: 400 },
      );
    }

    // Payment method validation ===
    if (!paymentMethods.includes(method)) {
      return Response.json(
        { success: false, message: "Invalid payment method" },
        { status: 400 },
      );
    }

    // Verify account ownership ===
    const account = await AccountModel.findOne({
      _id: accountId,
      userId: auth.userId,
    }).select("_id");

    if (!account) {
      return Response.json(
        { success: false, message: "Account not found" },
        { status: 404 },
      );
    }

    // Check duplicate transaction ID ===
    const existingRequest = await RequestModel.findOne({
      transactionId,
    }).select("_id");

    if (existingRequest) {
      return Response.json(
        {
          success: false,
          message: "This transaction ID has already been submitted",
        },
        { status: 409 },
      );
    }

    // Create deposit request ===
    await RequestModel.create({
      accountId,
      requestType,
      amount,
      method,
      month,
      transactionId,
      note,
      status: "pending",
    });

    return Response.json(
      { success: true, message: "Deposit request submitted successfully" },
      { status: 201 },
    );
  } catch (error) {
    // Handle duplicate key error
    if (error instanceof Error && "code" in error && error.code === 11000) {
      return Response.json(
        {
          success: false,
          message: "This transaction ID has already been submitted",
        },
        { status: 409 },
      );
    }

    console.error("Deposit request error:", error);
    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
