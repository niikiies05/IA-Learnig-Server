import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import StudentService from '@/resources/services/student/student.service';

const studentService = new StudentService();

export const deleteStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const studentId = req.params.id;
        const student = await studentService.deleteStudent(studentId);
        if (student) {
            res.status(200).json({ message: 'Student delete successfully' });
        } else {
            next(new HttpException(404, 'Student not found'));
        }
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
