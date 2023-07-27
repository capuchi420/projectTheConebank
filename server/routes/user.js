import express from "express";
import { findTheUser, login, register, transfer, request, delReq, acceptReq } from "../controllers/user.js";

export const userRouter = express.Router();

userRouter.get('/:_id', findTheUser);
userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.put('/transfer', transfer);
userRouter.put('/request', request);
userRouter.put('/delReq', delReq);
userRouter.put('/acceptReq', acceptReq);