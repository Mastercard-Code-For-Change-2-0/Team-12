
import express from "express";
import { sendFeedback, getFeedback ,getAllFeedbacks } from "../controller/feedback.controller.js";

const router = express.Router();


router.post("/send", sendFeedback);

router.get("/get", getFeedback);
router.get("/all", getAllFeedbacks);

export default router;
