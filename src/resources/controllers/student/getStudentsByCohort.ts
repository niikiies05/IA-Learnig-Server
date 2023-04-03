import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import StudentService from '@/resources/services/student/student.service';

const studentService = new StudentService();

export const getStudentsByCohort = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const cohortId = req.params.cohortId;
        const students = await studentService.getStudentsByCohort(cohortId);
        res.status(200).json({ data: students });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
