import mongoose, { Schema, Document } from "mongoose";

export interface ITotalVisit extends Document {
  totalHttpRequests: number;
  totalNewVisitors: number;
}

const TotalVisitSchema: Schema = new Schema({
  totalHttpRequests: { type: Number, default: 0 },
  totalNewVisitors: { type: Number, default: 0 },
});

export default mongoose.model<ITotalVisit>("TotalVisit", TotalVisitSchema);
