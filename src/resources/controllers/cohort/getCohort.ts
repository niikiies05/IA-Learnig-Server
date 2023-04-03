import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import CohortService from '@/resources/services/cohort/cohort.service';

const cohortService = new CohortService();

export const getCohort = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const id = req.params.id;
        const cohort = await cohortService.getById(id);
        if (cohort) {
            res.status(200).json({ data: cohort });
        } else {
            next(new HttpException(404, 'Cohort not found'));
        }
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
