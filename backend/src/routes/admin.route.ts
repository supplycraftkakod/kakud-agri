import express from 'express';
import { upload } from '../middlewares/upload';
import { addProduct, deleteProductById, getMostViewedProducts, getProductsGroupedByMonth, getTotalProductCount, getTotalProductViews, updateProduct } from '../controllers/admin.controller';


const router = express.Router();

//@ts-ignore
router.post('/product', upload.single('image') as RequestHandler, addProduct);
//@ts-ignore
router.put('/product/:id', updateProduct);
//@ts-ignore
router.delete('/products/:id', deleteProductById);

router.get('/views', getTotalProductViews);
router.get('/count', getTotalProductCount);
router.get('/monthly', getProductsGroupedByMonth);
router.get('/most-viewed', getMostViewedProducts); // ?limit=10 (optional)

export default router;
