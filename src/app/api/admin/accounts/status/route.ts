import dbConnect from "@/lib/dbConnect";
import { getAuthUser } from "@/helpers/getUser";
import { accStatus } from "@/constants/account";
import AccountModel from "@/models/Account";

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
    const { accountId, newStatus } = await request.json();
    if (!accountId || !newStatus) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!accStatus.includes(newStatus)) {
      return Response.json(
        { success: false, message: "Invalid status" },
        { status: 400 },
      );
    }

    const updatedAccountStatus = await AccountModel.findByIdAndUpdate(
      accountId,
      { $set: { status: newStatus } },
      { returnDocument: "after" },
    );

    if (!updatedAccountStatus) {
      return Response.json(
        { accountId: false, message: "Account not found" },
        { status: 404 },
      );
    }
    return Response.json(
      {
        accountId: true,
        message: "Status change successfully.",
        updatedAccountStatus,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { accountId: false, message: "Server error" },
      { status: 500 },
    );
  }
}
