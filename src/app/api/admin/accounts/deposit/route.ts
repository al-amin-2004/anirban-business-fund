import dbConnect from "@/lib/dbConnect";
import { getAuthUser } from "@/helpers/getUser";
import AccountModel from "@/models/Account";
import TransactionModel from "@/models/Transaction";

export async function PUT(request: Request) {
  try {
    await dbConnect();

    /* ================= Admin and Treasurer AUTH ================= */
    const auth = await getAuthUser();
    if (!auth.success) {
      return Response.json(
        { success: false, message: auth.message },
        { status: auth.status },
      );
    }
    if (auth.role !== "admin" && auth.role !== "treasurer") {
      return Response.json({ message: "Forbidden" }, { status: 403 });
    }

    // Basic input validation ===
    const { accountId, amount, month } = await request.json();
    if (!accountId || !amount || !month) {
      return Response.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    if (amount <= 0) {
      return Response.json(
        { success: false, message: "Invalid deposit amount" },
        { status: 400 },
      );
    }

    // Account existence check ===
    const account = await AccountModel.findById(accountId);
    if (!account) {
      return Response.json(
        { success: false, message: "Account not found" },
        { status: 404 },
      );
    }

    // Account status check ===
    if (account.status === "frozen" || account.status === "inactive") {
      return Response.json(
        { success: false, message: `Account is ${account.status}` },
        { status: 400 },
      );
    }

    // Duplicate month check ===
    const existingDeposit = await TransactionModel.findOne({
      accountId,
      month,
      transactionType: "deposit",
    });
    if (existingDeposit) {
      return Response.json(
        { success: false, message: "Deposit already exists for this month" },
        { status: 409 },
      );
    }

    // Create transaction ===
    const newBalance = account.currentBalance + amount;
    await TransactionModel.create({
      accountId,
      amount,
      month,
      transactionType: "deposit",
      method: "cash",
      transactionDate: new Date(),
      processedBy: auth.userId,
      newBalance,
    });

    // Update account ===
    await AccountModel.findByIdAndUpdate(accountId, {
      $inc: {
        totalDeposit: amount,
        currentBalance: amount,
      },
    });

    return Response.json(
      { success: true, message: "Deposit successful" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
