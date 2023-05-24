import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import StudentService from '@/resources/services/student/student.service';
import { analyzeNavigationHistory } from '@/resources/services/student/navigationHistoryAnalyzer.service';
import { getModuleRecommendations } from '@/resources/services/gpt3.service';

const studentService = new StudentService();

export const generateRecommendations = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const studentId = req.params.id;
        const student = await studentService.getStudent(studentId);

        if (!student) {
            return res.status(404).send('Student not found');
        }

        // Analyze the student's navigation history and extract relevant interests
        const topInterests = analyzeNavigationHistory(student);

        // Use GPT-3 to generate module recommendations
        const recommendations = await getModuleRecommendations(topInterests);

        res.send(recommendations);
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
