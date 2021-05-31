import express from "express";
import RoomSchema from "../Modals/Room_Modal.js";
import MessageSchema from "../Modals/Message_Modal.js";

const router = express.Router();

export const createRoom = async(req,res) => {
    const { userId1, userId2, userName1, userName2 } = req.body;
    try {
        const existingRoom = await RoomSchema.findOne({userId1, userId2});
        if(existingRoom) {
            return res.status(404).json({message: "Room already exists"});
        } 

        const newRoom = await RoomSchema.create({ userId1, userId2, userName1, userName2 });
        res.send(200).json(newRoom);
        
    }catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const getRoom = async(req, res) => {
    const { id } = req.params;
    try {
        const Info = await RoomSchema.find({$or: [{userId1:id}, {userId2:id}]});
        res.status(200).json(Info);
    }catch (err) {
        res.status(404).json({message: err.message});
    }
}

export const deleteRoom = async(req,res) => {
    const { id } = req.params;
    try {
        const detRoom = await RoomSchema.findByIdAndDelete(id);
        const detMsg = await MessageSchema.deleteMany({roomId: id});
        res.status(200).json({ detRoom, detMsg});
    }catch (err) {
        res.status(404).json({message: err.message});
    }
};

export default router;