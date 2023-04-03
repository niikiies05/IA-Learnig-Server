import { Router } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/validations/cohort/cohort.validation';
import { createCohort } from '@/resources/controllers/cohort/createCohort';
import { updateCohort } from '@/resources/controllers/cohort/updateCohort';
import { getAllCohorts } from '@/resources/controllers/cohort/getAllCohorts';
import { getCohort } from '@/resources/controllers/cohort/getCohort';
import { deleteCohort } from '@/resources/controllers/cohort/deleteCohort';
import { getCohortsByYear } from '@/resources/controllers/cohort/getCohortsByYear';

class CohortController implements Controller {
    public path = '/cohorts';
    public router = Router();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.createCohort),
            createCohort
        );
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateCohort),
            updateCohort
        );
        this.router.get(`${this.path}`, getAllCohorts);
        this.router.get(`${this.path}/:id`, getCohort);
        this.router.get(`${this.path}/year/:year`, getCohortsByYear);
        this.router.delete(`${this.path}/:id`, deleteCohort);
    }
}

export default CohortController;
