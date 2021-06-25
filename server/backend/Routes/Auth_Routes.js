import express from "express";
import { signin, signup, getUsers, logouts, getUsersStatus } from "../Controllers/Auth_Controller.js";

const router = express.Router();

router.patch("/signin", signin);
router.post("/signup", signup);
router.get("/", getUsers);
router.get("/status/:id", getUsersStatus);
router.patch("/logout/:id",logouts);

export default router;