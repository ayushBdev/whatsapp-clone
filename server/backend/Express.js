import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";
import Pusher from "pusher";
import dotenv from "dotenv";

import authRoute from "./Routes/Auth_Routes.js";
import roomRoute from "./Routes/Room_Routes.js";
import messageRoute from "./Routes/Message_Routes.js";

const app = express();

app.use(bodyparser.json({limit:"30mb", extended:true}));
app.use(bodyparser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

app.use("/auth", authRoute);
app.use("/room", roomRoute);
app.use("/message", messageRoute);


dotenv.config({path: "./.env"});

const PORT = process.env.PORT || 5000;
const ATLAS = process.env.ATLAS;

mongoose.connect(ATLAS, { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
    .then(() => app.listen(PORT, () => console.log(`Server running at Port ${PORT}`)))
    .catch((err) => console.log(`${err} did not connected`));

const pusher = new Pusher({
    appId: process.env.appId,
    key: process.env.key,
    secret: process.env.secret,
    cluster: process.env.cluster,
    useTLS: true
});

const db = mongoose.connection;

db.once("open", () => {

    console.log("DB connected");

    const roomCollection = db.collection("roomschemas");
    const changeStream = roomCollection.watch();

    changeStream.on("change",(change)=>{
        console.log("A change occured", change);

        if(change.operationType === 'insert') {
        const roomDetails = change.fullDocument;
        pusher.trigger("rooms","inserted",
            {
                userId1 : roomDetails.userId1,
                userId2 : roomDetails.userId2,
                userName1: roomDetails.userName1,
                userName2: roomDetails.userName2,
                _id: roomDetails._id
            });
        } else {
            if(change.operationType === 'delete') {
                const roomDetails = change.documentKey._id;
                pusher.trigger("rooms","deleted", roomDetails);
            }
        }
    });

    //---------------------------------------------------------------------------------------------------

    const messageCollection = db.collection("messageschemas");
    const changeStream2 = messageCollection.watch();

    changeStream2.on("change",(change)=>{
        console.log("A change occured", change);

        if(change.operationType === 'insert') {
        const messageDetails = change.fullDocument;
        pusher.trigger("message","inserted", 
            {
                roomId: messageDetails.roomId,
                msg: messageDetails.msg,
                from: messageDetails.from,
                time: messageDetails.time,
                date: messageDetails.date,
            });
        } else {
            console.log("Error Trigging Pusher");
        }
    });
});