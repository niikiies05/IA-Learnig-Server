import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import IStudent from "@/resources/interfaces/student/student.interface";

const studentSchema = new Schema<IStudent>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true},
    interests: { type: [String], default: [] },
    navigationHistory: { type: [Object], default: [] },
    cohorts: [{ type: Schema.Types.ObjectId, ref: 'Cohort' }],
});


studentSchema.pre<IStudent>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

studentSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IStudent>('IStudent', studentSchema);
