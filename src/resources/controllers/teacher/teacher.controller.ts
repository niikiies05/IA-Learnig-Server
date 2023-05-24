import { Router } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/validations/teacher/teacher.validation';
import { createTeacher } from '@/resources/controllers/teacher/createTeacher';
import { updateTeacher } from '@/resources/controllers/teacher/updateTeacher';
import { deleteTeacher } from '@/resources/controllers/teacher/deleteTeacher';
import { getTeacherById } from '@/resources/controllers/teacher/getTeacherById';
import { getAllTeachers } from '@/resources/controllers/teacher/getAllTeachers';

class TeacherController implements Controller {
    public path = '/teachers';
    public router = Router();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.create),
            createTeacher
        );
        this.router.put(
            `${this.path}/update/:id`,
            validationMiddleware(validate.update),
            updateTeacher
        );
        this.router.delete(`${this.path}/delete/:id`, deleteTeacher);
        this.router.get(`${this.path}/:id`, getTeacherById);
        this.router.get(`${this.path}`, getAllTeachers);
    }
}

export default TeacherController;
