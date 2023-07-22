import { userModel } from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        let user = await userModel.findOne({ email });
        if(!user) return res.json({ status: false, msg: "Email not in use" });

        const checkPass = await bcrypt.compare(password, user.password);

        if(!checkPass) return res.json({ status: false, msg: "Wrong password" });

        return res.json({ status: true, user });
    }catch(err){
        res.json({ status: false, err });
    }
}

export const register = async (req, res) => {
    try{
        const { username, email, password, repeatPassword } = req.body;

        let user = await userModel.findOne({ username });
        if(user) return res.json({ status: false, msg: "Username already taken" });

        user = await userModel.findOne({ email });
        if(user) return res.json({ status: false, msg: "Email already taken" });

        if(password !== repeatPassword) return res.json({ status: false, msg: "Password do not match" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
            balance: 0,
            requests: [],
            history: []
        });

        return res.json({ status: true, createdUser });
    }catch(err){
        res.json({ status: false, err });
    }
}

export const findTheUser = async (req, res) => {
    try{
        const { _id } = req.params;
        const user = await userModel.findById(_id);
        return res.json({ status: true, user });
    }catch(err){
        res.json({ status: false, err });
    }
}

export const transfer = async (req, res) => {
    try{
        
    }catch(err){
        res.json({ status: false, err });
    }
}
