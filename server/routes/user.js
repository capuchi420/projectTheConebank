import express from "express";
import { findTheUser, login, register } from "../controllers/user.js";

export const userRouter = express.Router();

userRouter.get('/:_id', findTheUser);
userRouter.post('/register', register);
userRouter.post('/login', login);