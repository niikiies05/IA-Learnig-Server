import { Document } from 'mongoose';

// Module de formation
export interface IModule extends Document {
    title: string;
    description: string;
    category: string;
    content: any;
}
