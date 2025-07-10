import express from 'express';
import authRouter from './auth.route';
import adminRouter from './admin.route';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);

export default router;