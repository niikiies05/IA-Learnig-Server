import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import TeacherService from '@/resources/services/teacher/teacher.service';

const teacherService = new TeacherService();

export const getAllTeachers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const teachers = await teacherService.getAllTeachers();
        res.status(200).json({ teachers });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
