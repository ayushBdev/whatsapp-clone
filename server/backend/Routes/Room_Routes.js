import express from "express";
import { getRoom, getRoomOfUser, createRoom, deleteRoom } from "../Controllers/Room_Controller.js";

const router = express.Router();

router.get("/rooms/:id", getRoom);
router.get("/userRooms/:id", getRoomOfUser);
router.post("/", createRoom);
router.delete("/delete/:id", deleteRoom);

export default router;