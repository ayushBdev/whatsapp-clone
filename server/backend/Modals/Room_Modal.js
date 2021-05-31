import mongoose from "mongoose";

const RoomModal = mongoose.Schema({
    userId1: {
        type: String,
        required: true,
    },
    userId2: {
        type: String,
        required: true,
    },
    userName1: {
        type: String,
        required: true,
    },
    userName2: {
        type: String,
        required: true,
    },
});

export default mongoose.model("RoomSchema", RoomModal);