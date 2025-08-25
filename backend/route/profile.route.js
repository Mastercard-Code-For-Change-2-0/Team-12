import express from 'express';
import {updateProfile , profile ,deleteProfile} from '../controller/profile.controller.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
// Define profile-related routes here

router.post('/update',  updateProfile);
router.get('/fetch',  profile);
router.delete('/delete', deleteProfile);

export default router;