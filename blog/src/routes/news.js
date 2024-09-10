import express from 'express';
const router = express.Router();

//đối tượng khởi tạo từ new contructor controller
import NewsController from '../app/controllers/NewsController.js';

const newsController = NewsController;

router.get('/:slug', newsController.show);
router.get('/', newsController.index);

export default router;
