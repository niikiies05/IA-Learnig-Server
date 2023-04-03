import { Document } from 'mongoose';
import IStudent from '@/resources/interfaces/student/student.interface';
import { IModule } from '@/resources/interfaces/module/module.interface';

export interface ICohort extends Document {
    name: string;
    year: number;
    students: IStudent['_id'][];
    modules: IModule['_id'][];
}
