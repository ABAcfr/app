import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  passwordHash: String,
  verified: { type: Boolean, default: false },
  smsCode: String,          // код для подтверждения при регистрации
  smsCodeExpiry: Date
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
