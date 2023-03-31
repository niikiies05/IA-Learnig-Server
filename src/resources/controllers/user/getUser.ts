import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

export const getUser = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    if (!req.user) {
        return next(new HttpException(404, 'No logged in user'));
    }

    res.status(200).send({ data: req.user });
};
