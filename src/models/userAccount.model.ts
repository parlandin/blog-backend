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
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model<IUserAccount>("UserAccount", UserAccountSchema);
