import express from "express";
import { 
    deleteMessage, sendMessage,getAllMessage } from "../controller/messageController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", sendMessage);
router.delete("/delete/:id", isAuthenticated, deleteMessage);
router.get("/getall", isAuthenticated, getAllMessage);

export default router;