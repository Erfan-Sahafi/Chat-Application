import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller";
import authMid from "../middlewares/authMid";

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.get('/getme',authMid,getMe)

export default router;