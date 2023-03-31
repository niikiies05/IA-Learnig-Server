import User from '@/resources/interfaces/user/user.interface';

declare global {
    namespace Express {
        export interface Request {
            user: User;
        }
    }
}
