import { Request, Response } from 'express';
import prisma from '../prisma';
import jwt from 'jsonwebtoken';
import { comparePassword, hashPassword } from '../utils/hash';

export const signup = async (req: Request, res: Response) => {
    const { email, password, name, phone } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone,
                role: 'USER',
            },
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

        res.json({
            token,
            role: user.role,
            userId: user.id,
            email: user.email
        });
    } catch (error) {
        res.status(400).json({ error: 'User already exists' });
    }
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user || !user.password || !(await comparePassword(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
        
        res.json({
            token,
            role: user.role,
            userId: user.id,
            email: user.email
        });
    } catch (e) {
        res.status(400).json({ error: 'Error occurred' });
    }
};

export const logout = (req: Request, res: Response) => {
    req.logout?.((err) => {
        if (err) {
            return res.status(500).send('Error logging out');
        }

        req.session?.destroy((err) => {
            if (err) {
                return res.status(500).send('Error destroying session');
            }

            res.clearCookie('connect.sid', { path: '/' });
            res.status(200).send('Logged out successfully');
        });
    });
};

export const verifyToken = (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        return res.status(200).json({ user: decoded });
    });
};

export const checkGoogleLogin = (req: Request, res: Response) => {
    if (req.isAuthenticated?.()) {
        return res.status(200).json({ isLoggedIn: true });
    } else {
        return res.status(401).json({ isLoggedIn: false });
    }
};
