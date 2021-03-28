import { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcryptjs";
import { UserInterface } from "../interfaces/user";

export interface UserModel extends UserInterface, Document {}

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    name: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<UserModel>("save", async function(next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

export const User: Model<UserModel> = model<UserModel>("User", UserSchema);
