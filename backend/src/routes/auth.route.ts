import express from 'express';
import {
    signup,
    login,
    logout,
    verifyToken,
    checkGoogleLogin
} from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/signup', signup);
//@ts-ignore
authRouter.post('/login', login);
authRouter.post('/logout', logout);
//@ts-ignore
authRouter.get('/verify-token', verifyToken);
//@ts-ignore
authRouter.get('/check-google-login', checkGoogleLogin);

export default authRouter;
