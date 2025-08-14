// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// export interface JwtPayloadWithUserId extends jwt.JwtPayload {
//   userId: number;
// }

// export const isAuth = (req: Request, res: Response, next: NextFunction) => {
//   if (req.isAuthenticated()) {
//     //@ts-ignore
//     req.user = req.session.passport.user
//     return next();
//   }

//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayloadWithUserId;
//     req.user = { id: decoded.userId };;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid token' });
//   }
// };


import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET! || 'dev_secret_key';

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (req.isAuthenticated()) {
    //@ts-ignore
    req.user = req.session.passport.user
    return next();
  }

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT verify failed:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorize = (...roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden: Insufficient role' });
  }

  next();
};