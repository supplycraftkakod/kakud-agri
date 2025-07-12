import express from 'express';
import { upload } from '../middlewares/upload';
import { addProduct, updateProduct } from '../controllers/admin.controller';


const router = express.Router();

//@ts-ignore
router.post('/product', upload.single('image') as RequestHandler, addProduct);
//@ts-ignore
router.put('/product/:id', updateProduct);

export default router;
