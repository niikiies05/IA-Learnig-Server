import { Document } from 'mongoose';
import IStudent from '@/resources/interfaces/student/student.interface';
import { IModule } from '@/resources/interfaces/module/module.interface';

export default interface IFeedback extends Document {
    students: IStudent['_id'][];
    modules: IModule['_id'][];
    content: string;
}
