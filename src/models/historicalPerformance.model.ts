import mongoose, { Schema, Document, Types } from "mongoose";

interface IHistoricalPerformance extends Document {
  vendor: Types.ObjectId;
  date: Date;
  onTimeDeliveryRate: number;
  qualityRatingAvg: number;
  averageResponseTime: number;
  fulfillmentRate: number;
}

const HistoricalPerformanceSchema: Schema = new Schema({
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  date: { type: Date, required: true },
  onTimeDeliveryRate: { type: Number, required: true },
  qualityRatingAvg: { type: Number, required: true },
  averageResponseTime: { type: Number, required: true },
  fulfillmentRate: { type: Number, required: true },
});

const HistoricalPerformance = mongoose.model<IHistoricalPerformance>(
  "HistoricalPerformance",
  HistoricalPerformanceSchema
);
export default HistoricalPerformance;
