import { Document } from 'mongoose';
import { ICohort } from '@/resources/interfaces/cohort/cohort.interface';

// Étudiant
export default interface IStudent extends Document {
    name: string;
    matricule: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
    birthDate: Date;
    interests: string[];
    navigationHistory: any[];
    cohorts: ICohort['_id'][];
}
