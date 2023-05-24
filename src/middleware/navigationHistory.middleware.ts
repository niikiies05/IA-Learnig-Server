import { NextFunction, Request, Response } from 'express';
import IStudent from '@/resources/interfaces/student/student.interface';
import StudentModel from '@/resources/models/student/student.model';

export const navigationHistoryMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    const { email, accessedModule } = req.body;

    try {
        const student: IStudent | null = await StudentModel.findOne({ email });

        if (student) {
            student.navigationHistory.push(accessedModule);
            await student.save();
        }
    } catch (error) {
        console.error('Error recording navigation history:', error);
    }

    next();
};
