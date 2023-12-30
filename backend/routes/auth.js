import express from 'express';
import { signup , signin, sendOTPforverification, verifyotp ,} from '../controllers/auth.js';
import { authenticateToken } from '../middleware/authToken.js';
const router = express.Router();
router.post("/signup",signup)
router.post("/signin",signin)
router.post("/emailOtpSend", sendOTPforverification );
router.post("/emailOtpVerify", verifyotp );



// router.post("/google",googleAuth)



export default router