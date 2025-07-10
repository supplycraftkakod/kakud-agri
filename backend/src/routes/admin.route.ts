import express from 'express';
import { upload } from '../middlewares/upload';
import { addProduct } from '../controllers/admin.controller';

const router = express.Router();

//@ts-ignore
router.post('/product', upload.single('image') as RequestHandler, addProduct);

export default router;
