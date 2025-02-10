import { Router } from "express";
import { updateUser } from "../controllers/user.controller";
import authMid from "../middlewares/authMid";

const router = Router()

router.post('/update',authMid,updateUser)

export default router;