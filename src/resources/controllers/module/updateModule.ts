import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import ModuleService from '@/resources/services/module/module.service';

const moduleService = new ModuleService();

export const updateModule = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedModule = await moduleService.update(id, data);
        res.status(200).json({ data: updatedModule });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
