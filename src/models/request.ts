import {
  paymentMethods,
  requestStatus,
  requestTypes,
} from "@/constants/account";
import { IRequest } from "@/types/request";
import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema<IRequest>(
  {
    accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    requestType: { type: String, enum: requestTypes, required: true },
    amount: { type: Number, required: true, min: 1 },
    method: {
      type: String,
      enum: paymentMethods,
      required: function (this: mongoose.HydratedDocument<IRequest>): boolean {
        return this.requestType === "deposit";
      },
    },
    transactionId: {
      type: String,
      trim: true,
      maxlength: 70,
      required: function (this: mongoose.HydratedDocument<IRequest>): boolean {
        return this.method !== "cash";
      },
    },
    month: { type: String },
    note: { type: String, trim: true, maxlength: 500, default: "" },
    status: { type: String, enum: requestStatus, default: "pending" },
    processedBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    processedAt: { type: Date, default: null },
    rejectionReason: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

requestSchema.index({ transactionId: 1 }, { unique: true, sparse: true });

const RequestModel =
  (mongoose.models.Request as mongoose.Model<IRequest>) ||
  mongoose.model<IRequest>("Request", requestSchema);

export default RequestModel;
