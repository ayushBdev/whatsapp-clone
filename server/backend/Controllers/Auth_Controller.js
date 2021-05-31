import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthUsers from "../Modals/Auth_Modal.js";

const secret = "test";

export const signin = async(req,res) => {
    const { phoneNumber, password } = req.body;
    try {
        const oldUser = await AuthUsers.findOne({phoneNumber});
        if(!oldUser) return res.status(404).json({message: "User Does not exists"});
        
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Incorrect Credentials"});

        const updateStatus = await AuthUsers.findOneAndUpdate({phoneNumber:phoneNumber}, {status: "Online"});
        const token = jwt.sign({phoneNumber: oldUser.phoneNumber, id:oldUser._id}, secret, {expiresIn: "1h"});

        res.status(200).json({result: oldUser, token, updateStatus}).select(['-password']);

    }catch(error) {
        res.status(404).json({message: "Something went wrong Errored!!"});
        console.log(error);
    }
};

export const signup = async(req,res) => {
    const { name, phoneNumber, password, createdAt, status } = req.body;
    try {
        const oldUser = await AuthUsers.findOne({phoneNumber});
        if(oldUser) return res.status(400).json({message: "User Already Exists"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await AuthUsers.create({phoneNumber: phoneNumber, password: hashedPassword, name: name, createdAt: createdAt, status: status});

        const token = jwt.sign({ phoneNumber: result.phoneNumber, id: result._id}, secret, {expiresIn: "1h"});
        res.status(200).json({result,token}).select(['-password']);
    }catch(error) {
        res.status(404).json({message: "Something went wrong!!"});
        console.log(error);
    }
};

export const getUsers = async(req,res) => {
    try {
        const users = await AuthUsers.find().select(['-password']);
        res.status(200).json(users);
    }catch(error) {
        res.status(404).json({message: "Something went wrong!!"});
        console.log(error);
    }
};

export const getUsersStatus = async(req,res) => {
    const { id } = req.params;
    try {
        const users = await AuthUsers.findOne({name: id}).select('status -_id');
        res.status(200).json(users);
    }catch(error) {
        res.status(404).json({message: "Something went wrong!!"});
        console.log(error);
    }
};

export const logouts = async(req,res) => {
    const { id } = req.params;
    const newDate = new Date();
    try {
        const logout = await AuthUsers.findByIdAndUpdate(id, {status: newDate});
        res.status(200).json(logout);
    }catch(error) {
        res.status(404).json({message: "Something went wrong!!"});
        console.log(error);
    }
};