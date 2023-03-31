import { Schema, model } from 'mongoose';
import {IModule} from "@/resources/interfaces/module/module.interface";

const moduleSchema = new Schema<IModule>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: Object, required: true },
});


export default model<IModule>('IModule', moduleSchema);
