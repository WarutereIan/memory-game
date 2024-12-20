import { Schema, model } from "mongoose";
import { Password } from "../helpers/password";

interface IAdmin {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const AdminSchema = new Schema<IAdmin>({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: true
  }
});

AdminSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.Hash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

export const Admin = model<IAdmin>("Admin", AdminSchema);