import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import TeacherService from '@/resources/services/teacher/teacher.service';

const teacherService = new TeacherService();

export const deleteTeacher = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const teacherId = req.params.id;
        const teacher = await teacherService.deleteTeacher(teacherId);
        if (teacher) {
            res.status(200).json({ message: 'Teacher delete successfully' });
        } else {
            next(new HttpException(404, 'Teacher not found'));
        }
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
