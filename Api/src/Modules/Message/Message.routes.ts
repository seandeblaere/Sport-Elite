import { Router } from "express";
import {
  sendMessage,
  getMessages,
  markMessageAsRead,
} from "./Message.controller";

const router = Router();
router.post("/messages", sendMessage);
router.patch("/messages/:messageId", markMessageAsRead);
router.get("/conversations/:conversationId/messages", getMessages);

export default router;
