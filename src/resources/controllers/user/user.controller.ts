import { Router } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/validations/user/user.validation';
import authenticated from '@/middleware/authenticated.middleware';
import { register } from './register';
import { login } from './login';
import { getUser } from './getUser';

class UserController implements Controller {
    public path = '/users';
    public router = Router();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            login
        );
        this.router.get(`${this.path}`, authenticated, getUser);
    }
}

export default UserController;
