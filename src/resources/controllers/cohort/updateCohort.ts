import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import CohortService from '@/resources/services/cohort/cohort.service';

const cohortService = new CohortService();

export const updateCohort = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedCohort = await cohortService.update(id, data);
        res.status(200).json({ data: updatedCohort });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
