import { getAuthUser } from "@/helpers/getUser";
import dbConnect from "@/lib/dbConnect";
import AccountModel from "@/models/Account";

// Account Update API function ===
export async function PATCH(request: Request) {
  try {
    await dbConnect();

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

    const {
      accountId,
      accName,
      accNumber,
      identification: { nid, birthId, dateOfBirth },
    } = await request.json();

    // Check if account exists ===
    const existingAccount = await AccountModel.findById(accountId);
    if (!existingAccount) {
      return Response.json(
        { success: false, message: "Account not found" },
        { status: 404 },
      );
    }

    existingAccount.accName = accName;
    existingAccount.accNumber = accNumber;
    existingAccount.identification = {
      ...existingAccount.identification,
      nid,
      birthId,
      dateOfBirth,
    };

    await existingAccount.save();

    return Response.json({
      success: true,
      message: "Account updated successfully",
    });
  } catch (error) {
    console.error("Account update error:", error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
