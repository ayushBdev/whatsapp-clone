import mongoose from "mongoose";

const MessageModal = mongoose.Schema({
    roomId: {
        type: String,
        required: true,
    },
    msg: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
});

export default mongoose.model("MessageSchema", MessageModal);