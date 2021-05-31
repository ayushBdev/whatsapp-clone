import express from "express";
import { getRoom, createRoom, deleteRoom } from "../Controllers/Room_Controller.js";

const router = express.Router();

router.get("/:id", getRoom);
router.post("/", createRoom);
router.delete("/delete/:id", deleteRoom);

export default router;