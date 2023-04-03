import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import StudentService from '@/resources/services/student/student.service';

const studentService = new StudentService();

export const getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const students = await studentService.getAllStudents();
        res.status(200).json({ students });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
