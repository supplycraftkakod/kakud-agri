import express from 'express';
import authRouter from './auth.route';
import adminRouter from './admin.route';
import productRouter from './product.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/product', productRouter);

export default router;