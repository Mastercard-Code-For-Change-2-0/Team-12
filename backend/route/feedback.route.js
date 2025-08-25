
import express from "express";
import { sendFeedback, getFeedback } from "../controller/feedback.controller.js";

const router = express.Router();


router.post("/send", sendFeedback);

router.get("/get", getFeedback);

export default router;
