import mongoose, { Schema, Document } from "mongoose";

export interface IUserAccount extends Document {
  username: string;
  email: string;
  code: string;
  codeExpiresAt: Date;
  cover?: string;
  created?: Date;
  updated?: Date;
}

const UserAccountSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  code: { type: String, required: true },
  codeExpiresAt: { type: Date, required: true },
  cover: { type: String, required: false },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model<IUserAccount>("UserAccount", UserAccountSchema);
