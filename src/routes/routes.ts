import App from '../app';
import UserController from '@/resources/controllers/user/user.controller';
import StudentController from '@/resources/controllers/student/student.controller';
import CohortController from '@/resources/controllers/cohort/cohort.controller';
import ModuleController from '@/resources/controllers/module/module.controller';
import TeacherController from '@/resources/controllers/teacher/teacher.controller';

export function initRoutes(app: App): void {
    app.initialiseControllers([
        new UserController(),
        new StudentController(),
        new CohortController(),
        new ModuleController(),
        new TeacherController(),
    ]);
}
