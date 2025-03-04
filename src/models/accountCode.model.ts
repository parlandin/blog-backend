import mongoose, { Schema, Document } from "mongoose";

export interface IAccountCode extends Document {
  code: string;
  username: string;
  param: string;
  codeExpiresAt: Date;
  created?: Date;
  updated?: Date;
}

const AccountCode: Schema = new Schema(
  {
    code: { type: String, required: true },
    param: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    codeExpiresAt: { type: Date, required: true },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<IAccountCode>("AccountCode", AccountCode);
