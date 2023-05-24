import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import ModuleService from '@/resources/services/module/module.service';

const moduleService = new ModuleService();

export const createModule = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { title, description, category, content } = req.body;
        const module = await moduleService.create(
            title,
            description,
            category,
            content
        );
        res.status(200).json({ data: module });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
