import express from "express";
import { getMessages, createMessage } from "../Controllers/Message_Controller.js";
const router = express.Router();

router.get("/:id", getMessages);
router.patch("/create/:id", createMessage);

export default router;