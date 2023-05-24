import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import ModuleService from '@/resources/services/module/module.service';

const moduleService = new ModuleService();

export const getModule = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const id = req.params.id;
        const module = await moduleService.getById(id);
        if (module) {
            res.status(200).json({ data: module });
        } else {
            next(new HttpException(404, 'Module not found'));
        }
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
