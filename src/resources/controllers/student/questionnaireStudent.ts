import { NextFunction, Request, Response } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import StudentService from '@/resources/services/student/student.service';

const studentService = new StudentService();

export const submitQuestionnaire = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const studentId = req.params.id;
        const { interests } = req.body;

        const student = await studentService.getStudent(studentId);
        if (!student) {
            return res.status(400).json({ message: 'Student not found' });
        }

        student.interests = interests;
        await student.save();

        res.status(200).json({
            message: 'Questionnaire submitted successfully',
        });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
