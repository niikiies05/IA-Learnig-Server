import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import ModuleService from '@/resources/services/module/module.service';

const moduleService = new ModuleService();

export const getAllModules = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const modules = await moduleService.getAll();
        res.status(200).json({ data: modules });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
