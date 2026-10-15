import { getAuthUser } from "@/helpers/getUser";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

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

    if (auth.role !== "admin") {
      return Response.json(
        { success: false, message: "Forbidden" },
        { status: 403 },
      );
    }

    const users = await UserModel.find({}).select("-password").lean();

    return Response.json({ success: true, users });
  } catch (error) {
    console.error("users api route error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
