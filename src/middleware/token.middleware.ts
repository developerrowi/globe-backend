import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

const secureMiddleware: any = (req: any, res: any, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    jwt.verify(token, JWT_SECRET, (err: any, payload: any) => {
    if (err) return res.status(403).json({ error: 'Forbidden' });
    req.user_id = payload.user_id;
    next();
    });
    
  }

  export default secureMiddleware;
