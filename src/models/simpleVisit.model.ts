import mongoose, { Schema, Document } from "mongoose";

export interface ISimpleVisit extends Document {
  url: string;
  visits: number;
}

const SimpleVisit: Schema = new Schema(
  {
    url: { type: String, required: true },
    visits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ISimpleVisit>("SimpleVisit", SimpleVisit);
