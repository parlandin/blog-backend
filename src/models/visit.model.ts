import mongoose, { Schema, Document } from "mongoose";

export interface IVisit extends Document {
  date: Date;
  httpRequests: number;
  newVisitors: number;
  uniqueVisitors: number;
  newMobileVisitors: number;
  uniqueMobileVisitors: number;
  uniqueIPs: string[];
}

const VisitSchema: Schema = new Schema({
  date: { type: Date, default: Date.now },
  httpRequests: { type: Number, default: 0 },
  newVisitors: { type: Number, default: 0 },
  uniqueVisitors: { type: Number, default: 0 },
  newMobileVisitors: { type: Number, default: 0 },
  uniqueMobileVisitors: { type: Number, default: 0 },
  uniqueIPs: { type: [String], default: [] },
});

export default mongoose.model<IVisit>("Visit", VisitSchema);
