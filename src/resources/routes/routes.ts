import App from '../../app';
import UserController from '@/resources/controllers/user/user.controller';
import StudentController from '@/resources/controllers/student/student.controller';
import CohortController from '@/resources/controllers/cohort/cohort.controller';

export function initRoutes(app: App): void {
    app.initialiseControllers([
        new UserController(),
        new StudentController(),
        new CohortController(),
    ]);
}
