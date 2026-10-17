import dbConnect from "@/lib/dbConnect";
import { role } from "@/constants/user";
import { getAuthUser } from "@/helpers/getUser";
import UserModel from "@/models/User";

export async function PUT(request: Request) {
  try {
    await dbConnect();

    /* ================= Admin AUTH ================= */
    // Verify token ===
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

    //  Basic input validation ====
    const { userId, newRole } = await request.json();
    if (!userId || !newRole) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!role.includes(newRole)) {
      return Response.json(
        { success: false, message: "Invalid role" },
        { status: 400 },
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { role: newRole } },
      { returnDocument: "after" },
    );

    if (!updatedUser)
      return Response.json(
        { userId: false, message: "User not found" },
        { status: 404 },
      );

    return Response.json(
      { userId: true, message: "Role change successfully.", updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { userId: false, message: "Server error" },
      { status: 500 },
    );
  }
}
