import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from './routes/user.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/user', userRouter);

try{
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port http://localhost:${process.env.PORT}`);
        mongoose.connect(process.env.MONGO_URL).then(console.log('DB connected'));
    });
}catch(err){
    console.log(err);
}