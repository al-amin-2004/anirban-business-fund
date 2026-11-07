import { getAuthUser } from "@/helpers/getUser";
import dbConnect from "@/lib/dbConnect";
import TransactionModel from "@/models/Transaction";

export async function GET() {
  try {
    await dbConnect();

    // Get auth token from cookies ===
    const auth = await getAuthUser();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    // Admin and Treasurer guard ===
    if (auth.role !== "admin" && auth.role !== "treasurer") {
      return Response.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    const transactions = await TransactionModel.find().lean();

    return Response.json({ success: true, transactions }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Server errorr" },
      { status: 500 },
    );
  }
}
