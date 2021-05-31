import express from "express";
import MessageSchema from "../Modals/Message_Modal.js";

const router = express.Router();

export const createMessage = async(req,res) => {
    const { roomId, msg, from, time, date } = req.body;
    try {
        const data = await MessageSchema.create({ roomId, msg, from, time, date });
        res.send(200).json(data);
    }catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const getMessages = async(req, res) => {
    const { id } = req.params;
    try {
        const Info = await MessageSchema.find({roomId: id});
        res.status(200).json(Info);
    }catch (err) {
        res.status(404).json({message: err.message});
    }
}

export default router;