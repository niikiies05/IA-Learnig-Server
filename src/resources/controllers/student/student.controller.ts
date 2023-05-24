import { Router } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import { uploadFile } from '@/middleware/upload.middleware';
import validate from '@/resources/validations/student/student.validation';
import { createStudent } from '@/resources/controllers/student/createStudent';
import { updateStudent } from '@/resources/controllers/student/updateStudent';
import { getStudent } from '@/resources/controllers/student/getStudent';
import { deleteStudent } from '@/resources/controllers/student/deleteStudent';
import { importStudents } from '@/resources/controllers/student/importStudents';
import { getStudentsByCohort } from '@/resources/controllers/student/getStudentsByCohort';
import { getAllStudents } from '@/resources/controllers/student/getAllStudents';
import { submitQuestionnaire } from '@/resources/controllers/student/questionnaireStudent';
import {generateRecommendations} from "@/resources/controllers/student/modulesRecommendations";

class StudentController implements Controller {
    public path = '/students';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.create),
            createStudent
        );
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.update),
            updateStudent
        );
        this.router.put(
            `${this.path}/:studentId/questionnaire`,
            validationMiddleware(validate.questionnaire),
            submitQuestionnaire
        );
        this.router.get(`${this.path}/:id`, getStudent);
        this.router.get(`${this.path}/:studentId/recommendation`, generateRecommendations);
        this.router.get(`${this.path}/cohort/:cohortId`, getStudentsByCohort);
        this.router.get(`${this.path}/all`, getAllStudents);
        this.router.delete(`${this.path}/:id`, deleteStudent);
        this.router.post(`${this.path}/import`, uploadFile, importStudents);
    }
}

export default StudentController;
