import express from 'express';
import { upload } from '../middlewares/upload';
import { addProduct, createBlog, deleteBlogById, deleteProductById, getAllBlogs, getBlogById, getMostViewedProducts, getProductsGroupedByMonth, getTotalProductCount, getTotalProductViews, updateBlogById, updateProduct } from '../controllers/admin.controller';


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

//@ts-ignore
router.post('/create', upload.any(), createBlog);
router.get('/all', getAllBlogs);
//@ts-ignore
router.get('/blogs/:id', getBlogById);
//@ts-ignore
router.put('/blogs/:id', upload.any([]), updateBlogById);
//@ts-ignore
router.delete("/blogs/:id", deleteBlogById);

export default router;
