import mongoose from "mongoose";

 
const otpSchema = mongoose.Schema({
  doctorUserId: {
 
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  otp: String,
 
  mobileNumber:Number,
  createdAt: Date,
  expiredAt: Date, 
});

const UserOTP = mongoose.model("OTPverification", otpSchema);

 
 export default UserOTP ; 
