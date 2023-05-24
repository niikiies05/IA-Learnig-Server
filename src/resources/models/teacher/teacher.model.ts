import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import ITeacher from '@/resources/interfaces/teacher/teacher.interface';

const teacherSchema = new Schema<ITeacher>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    birthDate: { type: Date, required: true },
    subjects: { type: [String], default: [] },
    modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }],
});

teacherSchema.pre<ITeacher>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;

    next();
});

teacherSchema.methods.isValidPassword = async function (
    password: string
): Promise<Error | boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<ITeacher>('ITeacher', teacherSchema);
