import { Document } from 'mongoose';
import { IModule } from '@/resources/interfaces/module/module.interface';

export default interface ITeacher extends Document {
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
    birthDate: Date;
    subjects: string[];
    modules: IModule['_id'][];
}
