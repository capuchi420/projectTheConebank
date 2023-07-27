import { userModel } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

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
        const { _id, toId, amount } = req.body;
        const fromUser = await userModel.findById(_id);
        if(fromUser.balance < amount) return res.json({ status: false, msg: "You dont have enough money" });

        const toUser = await userModel.findById(toId);
        if(!toUser) return res.json({ status: false, msg: "Enter valid user ID" });

        fromUser.balance -= amount;
        toUser.balance += amount;

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let fromRev = {
            date: `${day}. ${month}. ${year}.`,
            msg: `Sent ${amount}$ to ${toUser.username}`
        };

        fromUser.history.push(fromRev);

        let toRev = {
            date: `${day}. ${month}. ${year}.`,
            msg: `Got ${amount}$ from ${fromUser.username}`
        };

        toUser.history.push(toRev);

        await userModel.replaceOne({ _id: _id }, fromUser);
        await userModel.replaceOne({ _id: toId }, toUser);
        res.send({ status: true, fromUser, toUser });
    }catch(err){
        res.json({ status: false, err });
    }
}

export const request = async (req, res) => {
    try{
        const { _id, toId, amount } = req.body;
        const fromUser = await userModel.findById(_id);
        //if(fromUser.balance < amount) return res.json({ status: false, msg: "You dont have enough money" });

        const toUser = await userModel.findById(toId);
        if(!toUser) return res.json({ status: false, msg: "Enter valid user ID" });

        let toRev = {
            id: uuidv4(),
            username: `${fromUser.username}`,
            amount: amount,
            toId: _id
        };

        console.log(toUser.requests)
        console.log('-----------------------------')

        toUser.requests.push(toRev);

        console.log(toUser.requests)

        await userModel.replaceOne({ _id: toId }, toUser);
        res.send({ status: true, fromUser, toUser });
    }catch(err){
        res.json({ status: false, err });
    }
}

export const delReq = async (req, res) => {
    try{
        const { userId, reqId } = req.body;
        const user = await userModel.findById(userId);

        let someArr = [];

        for(let i = 0; i < user.requests.length; i++){
            if(user.requests[i].id !== reqId){
                someArr.push(user.requests[i]);
            }
        }

        user.requests = someArr;

        await userModel.replaceOne({ _id: userId }, user);
        res.send({ status: true, user });
    }catch(err){
        res.json({ status: false, err });
    }
}

export const acceptReq = async (req, res) => {
    try{
        const { userId, toId, amount, reqId } = req.body;
        const fromUser = await userModel.findById(userId);
        if(fromUser.balance < amount) return res.json({ status: false, msg: "You dont have enough money" });

        const toUser = await userModel.findById(toId);
        if(!toUser) return res.json({ status: false, msg: "Enter valid user ID" });

        fromUser.balance -= amount;
        toUser.balance += amount;

        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();

        let fromRev = {
            date: `${day}. ${month}. ${year}.`,
            msg: `Sent ${amount}$ to ${toUser.username}`
        };

        fromUser.history.push(fromRev);

        let toRev = {
            date: `${day}. ${month}. ${year}.`,
            msg: `Got ${amount}$ from ${fromUser.username}`
        };

        toUser.history.push(toRev);

        let someArr = [];

        for(let i = 0; i < fromUser.requests.length; i++){
            if(fromUser.requests[i].id !== reqId){
                someArr.push(fromUser.requests[i]);
            }
        }

        fromUser.requests = someArr;

        await userModel.replaceOne({ _id: userId }, fromUser);
        await userModel.replaceOne({ _id: toId }, toUser);
        res.send({ status: true, fromUser, toUser });
    }catch(err){
        res.json({ status: false, err });
    }
}
