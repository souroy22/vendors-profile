import mongoose, { Schema, Document, Types } from "mongoose";

interface IPurchaseOrder extends Document {
  poNumber: string;
  vendor: Types.ObjectId;
  orderDate: Date;
  deliveryDate: Date;
  items: any;
  quantity: number;
  status: string;
  qualityRating?: number;
  issueDate: Date;
  acknowledgmentDate?: Date;
}

const PurchaseOrderSchema: Schema = new Schema({
  poNumber: { type: String, required: true, unique: true },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  items: { type: Object, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    enum: ["ORDERED", "SHIPPED", "OUT_FOR_DELIVERY", "DELIVERED"],
    default: "ORDERED",
  },
  qualityRating: { type: Number },
  issueDate: { type: Date, required: true },
  acknowledgmentDate: { type: Date },
});

const PurchaseOrder = mongoose.model<IPurchaseOrder>(
  "PurchaseOrder",
  PurchaseOrderSchema
);
export default PurchaseOrder;
