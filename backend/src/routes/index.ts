import express from 'express';
import authRouter from './auth.route';
import adminRouter from './admin.route';
import productRouter from './product.route';
import bannersRouter from './banners.route';
import userRouter from './user.route';
import eventRuter from './event.route';
import subscribeRouter from './subscribe.route';
import jobRoleRouter from './jobrole.route';
import impactRouter from './impact.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);
router.use('/admin/event', eventRuter);
router.use('/impact', impactRouter);
router.use('/banners', bannersRouter);
router.use('/product', productRouter);
router.use('/subscribe', subscribeRouter);
router.use('/job-role', jobRoleRouter);

export default router;