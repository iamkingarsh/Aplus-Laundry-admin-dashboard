import mongoose from "mongoose";


const otpSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  otp: String,
  createdAt: Date,
  expireAt: Date,
});

const UserOTP = mongoose.model("OTPverification", otpSchema);

export default UserOTP; // Export UserOTP as the default export


