import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import UserService from '@/resources/services/user/user.service';

const userService = new UserService();

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { email, password } = req.body;

        const token = await userService.login(email, password);

        res.status(200).json({ token });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
