import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import StudentService from '@/resources/services/student/student.service';

const studentService = new StudentService();

export const updateStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const studentId = req.params.id;
        const studentData = req.body;
        const student = await studentService.updateStudent(
            studentId,
            studentData
        );
        if (student) {
            res.status(200).json({ data: student });
        } else {
            next(new HttpException(404, 'Student not found'));
        }
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
