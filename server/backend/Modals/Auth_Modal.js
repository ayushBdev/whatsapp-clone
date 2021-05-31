import mongoose from "mongoose";

const AuthModal = mongoose.Schema({
    name: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
});

export default mongoose.model("AuthUsers", AuthModal);