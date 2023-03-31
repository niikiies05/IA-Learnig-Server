import { Schema, model } from 'mongoose';
import {ICohort} from "@/resources/interfaces/cohort/cohort.interface";

const cohortSchema = new Schema<ICohort>({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
});


export default model<ICohort>('ICohort', cohortSchema);
