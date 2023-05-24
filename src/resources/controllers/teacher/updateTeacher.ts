import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import TeacherService from '@/resources/services/teacher/teacher.service';

const teacherService = new TeacherService();

export const updateTeacher = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const teacherId = req.params.id;
        const teacherData = req.body;
        const teacher = await teacherService.updateTeacher(
            teacherId,
            teacherData
        );
        if (teacher) {
            res.status(200).json({ data: teacher });
        } else {
            next(new HttpException(404, 'Teacher not found'));
        }
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
