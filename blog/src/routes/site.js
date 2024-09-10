import express from 'express';
const router = express.Router();
import SiteController from '../app/controllers/SiteController.js';
import { authenticateToken } from '../middlewares/authMiddlewares.js';

const siteController = SiteController;
router.get('/', authenticateToken, siteController.home);
router.get('/search', siteController.search);


export default router;
