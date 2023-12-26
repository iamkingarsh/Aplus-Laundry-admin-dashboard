import express from 'express';
import { signup , signin} from '../controllers/auth.js';
import { authenticateToken } from '../middleware/authToken.js';
const router = express.Router();
router.post("/signup",signup)
router.post("/signin",signin)
// router.post("/google",googleAuth)



export default router