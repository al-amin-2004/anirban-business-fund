import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";
import { getAuthUser } from "@/helpers/getUser";

export async function GET() {
  try {
    await dbConnect();

    const auth = await getAuthUser();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }

    // Admin and Treasurer guard
    if (auth.role !== "admin" && auth.role !== "treasurer") {
      return Response.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    const accounts = await AccountModel.find().lean();

    return Response.json({ success: true, accounts }, { status: 200 });
  } catch (error) {
    console.error("account api route error", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
