import express from 'express';
import { signin, sendOTPforverification, verifyotp, register, getAllCustomers, getAlldeliveryagent, getallTeamMembers, sendOTPforMobileverification, verifymobileotp ,} from '../controllers/auth.js';
import { adminAuthenticateToken, authenticateToken } from '../middleware/authToken.js';
const router = express.Router();
router.post("/register",register)
router.post("/signin",signin)     
router.post("/emailOtpSend", sendOTPforverification );
router.post("/mobileOtpSend", sendOTPforMobileverification );

router.post("/adminEmailOtpSend",adminAuthenticateToken, sendOTPforverification );
router.post("/emailOtpVerify", verifyotp );
router.post("/mobileOtpVerify", verifymobileotp );

router.get("/getallcustomers",getAllCustomers)
router.get("/getalldeliveryagent",getAlldeliveryagent)
router.get("/getallTeamMembers",getallTeamMembers)




// router.post("/google",googleAuth)



export default router