import express from "express";
const router = express.Router();
import {authenticateToken} from "../middlewares/authMiddlewares.js";
import mecontroller from '../app/controllers/MeController.js';
const MeController = mecontroller;

router.post('/profile/numberphone',authenticateToken, MeController.profileNumberPhone);
router.get('/profile',authenticateToken,MeController.profileMe);
router.get('/stored/courses',authenticateToken, MeController.storedCourses);
router.get('/trash/courses',authenticateToken, MeController.trashCourses);


export default router;