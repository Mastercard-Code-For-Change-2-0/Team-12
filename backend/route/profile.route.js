import express from 'express';
import {updateProfile , profile} from '../controller/profile.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
// Define profile-related routes here

router.post('/update', authMiddleware, updateProfile);
router.get('/fetch', authMiddleware, profile);

export default router;