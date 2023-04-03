import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import CohortService from '@/resources/services/cohort/cohort.service';

const cohortService = new CohortService();

export const getAllCohorts = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const cohorts = await cohortService.getAll();
        res.status(200).json({ data: cohorts });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
