import mongoose, { Schema, Document } from "mongoose";
import { generateVendorCode } from "../utils/generateVenderCode";

export interface IVendor extends Document {
  name: string;
  contactDetails: string;
  address: string;
  vendorCode: string;
  onTimeDeliveryRate: number;
  qualityRatingAvg: number;
  averageResponseTime: number;
  fulfillmentRate: number;
}

const VendorSchema: Schema = new Schema({
  name: { type: String, required: true },
  contactDetails: { type: String, required: true },
  address: { type: String, required: true },
  vendorCode: { type: String, unique: true, required: true },
  onTimeDeliveryRate: { type: Number, default: 0 },
  qualityRatingAvg: { type: Number, default: 0 },
  averageResponseTime: { type: Number, default: 0 },
  fulfillmentRate: { type: Number, default: 0 },
});

const Vendor = mongoose.model<IVendor>("Vendor", VendorSchema);
export default Vendor;
