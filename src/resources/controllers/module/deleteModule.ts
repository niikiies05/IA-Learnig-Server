import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import ModuleService from '@/resources/services/module/module.service';

const moduleService = new ModuleService();

export const deleteModule = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const id = req.params.id;
        const module = await moduleService.delete(id);
        if (module) {
            res.status(200).json({ message: 'Module delete successfully' });
        } else {
            next(new HttpException(404, 'Module not found'));
        }
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
