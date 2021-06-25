import mongoose from "mongoose";

const MessageModal = mongoose.Schema({
    roomId: {
        type: String,
        required: true,
    },
    messages: [{
        msg: { type: String },
        time: { type: String },
        date: { type: String },
        from: { type: String },
    }],
});

export default mongoose.model("MessageSchema", MessageModal);