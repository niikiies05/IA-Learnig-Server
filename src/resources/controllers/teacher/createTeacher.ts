import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import TeacherService from '@/resources/services/teacher/teacher.service';

const teacherService = new TeacherService();

export const createTeacher = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { name, surname, phone, email, password, birthDate } = req.body;
        const teacher = await teacherService.createTeacher(
            name,
            surname,
            phone,
            email,
            password,
            birthDate
        );
        res.status(201).json({ data: teacher });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
