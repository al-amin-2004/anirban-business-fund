import { getAuthUser } from "@/helpers/getUser";
import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";

export async function GET() {
  try {
    await dbConnect();

    // Get the authenticated user ===
    const auth = await getAuthUser();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    // Fetch accounts for the authenticated user ===
    const accounts = await AccountModel.find({ userId: auth.userId })
      .sort({ createdAt: 1 })
      .lean();

    // If no accounts found, return a 404 response ===
    if (!accounts) {
      return Response.json({ success: false, account: null }, { status: 404 });
    }

    // If no accounts found, return a 404 response ===
    if (accounts.length === 0) {
      return Response.json(
        { success: false, message: "account not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, accounts });
  } catch (error) {
    console.error("accounts route error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
