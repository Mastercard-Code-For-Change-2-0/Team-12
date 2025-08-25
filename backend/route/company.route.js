import express from "express";
import { getUserByCompany } from "../controller/fetch.controller.js";

const router = express.Router();

// Route for fetching users by company
router.get("/users/company/:companyName", getUserByCompany);

export default router;
