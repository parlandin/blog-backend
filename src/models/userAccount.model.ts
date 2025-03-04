import mongoose, { Schema, Document } from "mongoose";

export interface IUserAccount extends Document {
  username: string;
  password: string;
  cover?: string;
  created?: Date;
  updated?: Date;
}

const UserAccountSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: false },
  cover: { type: String, required: false },
  role: { type: String, required: false, default: "user" },
  level: { type: Number, required: false, default: 1 },
  xp: { type: Number, required: false, default: 0 },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model<IUserAccount>("UserAccount", UserAccountSchema);
