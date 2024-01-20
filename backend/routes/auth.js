import express from 'express';
import { signin, sendOTPforverification, verifyotp, register, getAllCustomers, getAlldeliveryagent, deletebyid, getUserById ,} from '../controllers/auth.js';
import { authenticateToken } from '../middleware/authToken.js';
const router = express.Router();
router.post("/register",register)
router.post("/signin",signin)
router.post("/emailOtpSend", sendOTPforverification );
router.post("/emailOtpVerify", verifyotp );
router.get("/getallcustomers",getAllCustomers)
router.get("/getalldeliveryagent",getAlldeliveryagent)
// router.get("/getallTeamMembers",getallTeamMembers)
router.delete("/id/:id",deletebyid)
router.get("/id/:id",getUserById)
// router.post("/facebook",facebookAuth)
// router.post("/google",googleAuth)
export default router