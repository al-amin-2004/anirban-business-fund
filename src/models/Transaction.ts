import mongoose, { Schema } from "mongoose";
import { ITransaction } from "@/types";
import { paymentMethods, requestTypes } from "@/constants/account";

const transactionSchema = new Schema<ITransaction>(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    requestId: { type: Schema.Types.ObjectId, ref: "Request" },
    transactionType: { type: String, enum: requestTypes, required: true },
    month: { type: String },
    amount: { type: Number, required: true, min: 1 },
    method: { type: String, enum: paymentMethods },
    transactionId: { type: String, unique: true, sparse: true },
    transactionDate: { type: Date, default: Date.now },
    requestDate: { type: Date },
    newBalance: { type: Number, required: true },
    profitSource: { type: String },
    processedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

transactionSchema.index(
  { accountId: 1, month: 1, transactionType: 1 },
  { unique: true },
);

const TransactionModel =
  (mongoose.models.Transaction as mongoose.Model<ITransaction>) ||
  mongoose.model<ITransaction>("Transaction", transactionSchema);

export default TransactionModel;
