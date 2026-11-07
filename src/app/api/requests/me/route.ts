import dbConnect from "@/lib/dbConnect";
import { Types } from "mongoose";
import { getAuthUser } from "@/helpers/getUser";
import AccountModel from "@/models/Account";
import RequestModel from "@/models/request";

export async function GET(request: Request) {
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

    // Get query parameters ===
    const { searchParams } = new URL(request.url);

    const accountId = searchParams.get("accountId");
    const status = searchParams.get("status");

    if (!accountId || !Types.ObjectId.isValid(accountId)) {
      return Response.json(
        { success: false, message: "Invalid account ID" },
        { status: 400 },
      );
    }

    if (status !== "pending") {
      return Response.json(
        { success: false, message: "Invalid request status" },
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

    // Fetch requests ===
    const requests = await RequestModel.find({
      accountId,
      status,
    })
      .sort({ createdAt: -1 })
      .lean();

    return Response.json(
      { success: true, message: "Requests fetched successfully", requests },
      { status: 200 },
    );
  } catch (error) {
    console.error("Fetch requests error:", error);

    return Response.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
