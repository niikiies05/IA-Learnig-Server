import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import UserService from '@/resources/services/user/user.service';

const userService = new UserService();

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { name, email, password } = req.body;

        const token = await userService.register(name, email, password, 'user');

        res.status(201).json({ token });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
