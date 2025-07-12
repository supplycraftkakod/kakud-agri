import express from 'express';
import authRouter from './auth.route';
import adminRouter from './admin.route';
import productRouter from './product.route';
import bannersRouter from './banners.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/banners', bannersRouter);
router.use('/product', productRouter);

export default router;