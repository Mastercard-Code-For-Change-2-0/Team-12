import express from 'express';
import { getAllUsers , getAllUserData } from '../controller/fetch.controller.js';


const router = express.Router();


router.get('/user' , getAllUsers )
router.get('/userData' , getAllUserData )

export default router;