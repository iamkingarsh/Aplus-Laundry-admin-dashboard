import express from 'express';
import { signin, sendOTPforverification, verifyotp, register ,} from '../controllers/auth.js';
import { authenticateToken } from '../middleware/authToken.js';
const router = express.Router();
router.post("/register",register)
router.post("/signin",signin)
router.post("/emailOtpSend", sendOTPforverification );
router.post("/emailOtpVerify", verifyotp );



// router.post("/google",googleAuth)



export default router