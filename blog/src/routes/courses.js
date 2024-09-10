import express from 'express';
const router = express.Router();
import {authenticateToken} from '../middlewares/authMiddlewares.js';

import CourseController from '../app/controllers/CourseController.js';
const coursecontroller = CourseController;

router.post('/store',authenticateToken, coursecontroller.store);
router.get('/create',authenticateToken,coursecontroller.create);
router.get('/:slug',authenticateToken, coursecontroller.show);
router.get('/:id/edit', coursecontroller.edit);
router.post('/handle-form-action', coursecontroller.handleFormAction);
router.put('/:id',authenticateToken, coursecontroller.update);
router.patch('/:id/restore',authenticateToken, coursecontroller.restore);
router.delete('/:id',authenticateToken, coursecontroller.delete);
router.delete('/:id/force',authenticateToken, coursecontroller.forceDelete);



export default router;