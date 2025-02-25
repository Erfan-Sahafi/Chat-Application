import express from "express";
import cors from 'cors'
import helmet from "helmet";
import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
export const app = express()

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use("/auth", authRouter);
app.use("/user", userRouter);
