import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const userRouter = express.Router();

//@ts-ignore
userRouter.get("/me", authenticate, getUserDetails);
//@ts-ignore
userRouter.put("/me", authenticate, updateUserDetails);

export default userRouter;
