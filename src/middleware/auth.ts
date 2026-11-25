import Jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import UserModel from '../models/User';
import { DTOUser } from '../interfaces/IUsers';

declare global {
    namespace Express {
        interface Request {
            user?: DTOUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        const error = new Error('No autorizado');
        return res.status(401).json({ error: error.message });
    }

    const [, token] = bearer.split(' ');

    try {
        const jwtSecret = process.env.JWT_SECRET;
        const result = Jwt.verify(token, jwtSecret);
        if (typeof result === 'object' && result.id) {
            const user = await UserModel.findById(result.id).select('-password');
            if (!user) {
                const error = new Error('usuario no existe');
                return res.status(401).json({ error: error.message });
            }
            req.user = user;
            next()
        }
    } catch (error) {
        console.log(error);
    }
}