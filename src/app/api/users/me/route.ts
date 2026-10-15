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

    const user = await UserModel.findOne({ _id: auth.userId })
      .select("-password")
      .lean();

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, user });
  } catch (error) {
    console.error("me route error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
