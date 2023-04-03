import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import CohortService from '@/resources/services/cohort/cohort.service';

const cohortService = new CohortService();

export const createCohort = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const { name, year } = req.body;
        const cohort = await cohortService.create(name, year);
        res.status(200).json({ data: cohort });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
