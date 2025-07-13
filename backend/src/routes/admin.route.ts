import express from 'express';
import { upload } from '../middlewares/upload';
import { addProduct, deleteProductById, updateProduct } from '../controllers/admin.controller';


const router = express.Router();

//@ts-ignore
router.post('/product', upload.single('image') as RequestHandler, addProduct);
//@ts-ignore
router.put('/product/:id', updateProduct);
//@ts-ignore
router.delete('/products/:id', deleteProductById);

export default router;
