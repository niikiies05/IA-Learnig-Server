import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import StudentService from '@/resources/services/student/student.service';

const studentService = new StudentService();

export const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const studentData = req.body;
        const student = await studentService.createStudent(studentData);
        res.status(201).json({ data: student });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
