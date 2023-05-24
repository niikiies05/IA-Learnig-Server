import { Schema, model } from 'mongoose';
import { ICohort } from '@/resources/interfaces/cohort/cohort.interface';

const cohortSchema = new Schema<ICohort>({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    startDate: { type: Date, require: true },
    endDate: { type: Date, require: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
});

export default model<ICohort>('ICohort', cohortSchema);
