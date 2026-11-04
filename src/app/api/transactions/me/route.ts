import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";
import TransactionModel from "@/models/Transaction";
import { getAuthUser } from "@/helpers/getUser";

export async function GET(request: Request) {
  try {
    await dbConnect();

    // Get active account ID ===
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountId");

    // Check if accountId is provided ===
    if (!accountId) {
      return Response.json(
        { success: false, message: "Account id required" },
        { status: 400 },
      );
    }

    // Get auth token from cookies ===
    const auth = await getAuthUser();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    // Account ownership check ===
    const account = await AccountModel.findById(accountId);
    if (!account) {
      return Response.json(
        { success: false, message: "Account not found" },
        { status: 404 },
      );
    }

    // Check account belongs to this user ===
    if (account.userId.toString() !== auth.userId) {
      return Response.json(
        { success: false, message: "Access denied" },
        { status: 403 },
      );
    }

    // Fetch account Transactions ===
    const transactions = await TransactionModel.find({
      accountId,
    })
      .populate("processedBy", "fullName username")
      .sort({ createdAt: -1 })
      .lean();

    return Response.json({ success: true, transactions });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
