import express from "express";
import MessageSchema from "../Modals/Message_Modal.js";

const router = express.Router();

export const createMessage = async(req,res) => {
    const { id } = req.params;
    const { msg, from, time, date } = req.body;
    try {
        const update = await MessageSchema.findOneAndUpdate({roomId:id}, 
            {$push: 
                {messages: 
                    {"msg": msg, 
                    "time":time,
                    "date": date,
                    "from": from}}}, 
                {new:true}
        );
        res.status(200).json({message: "Message send successfully"});
    }catch (error) {
        res.status(404).json({message: "Something went wrong at server!!"});
        console.log(error);
    }
}

export const getMessages = async(req, res) => {
    const { id } = req.params;
    try {
        const Info = await MessageSchema.findOne({roomId: id});
        res.status(200).json(Info);
    }catch (error) {
        res.status(404).json({message: "Something went wrong at server!!"});
        console.log(error);
    }
}

export default router;