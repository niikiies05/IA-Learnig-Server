import { Router } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/validations/module/module.validation';
import { createModule } from '@/resources/controllers/module/createModule';
import { updateModule } from '@/resources/controllers/module/updateModule';
import { getAllModules } from '@/resources/controllers/module/getAllModules';
import { getModule } from '@/resources/controllers/module/getModule';
import { deleteModule } from '@/resources/controllers/module/deleteModule';

class ModuleController implements Controller {
    public path = '/modules';
    public router = Router();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.createModule),
            createModule
        );
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateModule),
            updateModule
        );
        this.router.get(`${this.path}`, getAllModules);
        this.router.get(`${this.path}/:id`, getModule);
        this.router.delete(`${this.path}/:id`, deleteModule);
    }
}

export default ModuleController;
