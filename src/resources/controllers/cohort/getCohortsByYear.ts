import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import CohortService from '@/resources/services/cohort/cohort.service';

const cohortService = new CohortService();

export const getCohortsByYear = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const year = parseInt(req.params.year);
        const cohorts = await cohortService.getByYear(year);
        if (cohorts) {
            res.status(200).json({ data: cohorts });
        } else {
            next(new HttpException(404, 'Cohort not found'));
        }
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
