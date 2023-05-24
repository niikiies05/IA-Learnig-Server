import TeacherModel from '@/resources/models/teacher/teacher.model';
import ITeacher from '@/resources/interfaces/teacher/teacher.interface';

class TeacherService {
    private teacher = TeacherModel;

    /**
     * Create a new teacher
     */
    public async createTeacher(
        name: string,
        surname: string,
        phone: string,
        email: string,
        password: string,
        birthDate: Date
    ): Promise<ITeacher | Error> {
        try {
            const teacher = await this.teacher.create({
                name,
                surname,
                phone,
                email,
                password,
                birthDate,
            });

            return teacher;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update a teacher
     */
    public async updateTeacher(
        id: string,
        updateData: Partial<ITeacher>
    ): Promise<ITeacher | null> {
        try {
            const teacher = await this.teacher.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            return teacher;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete a teacher
     */
    public async deleteTeacher(id: string): Promise<string> {
        try {
            await this.teacher.findByIdAndDelete(id);

            return 'Teacher deleted successfully';
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get a teacher by ID
     */
    public async getTeacherById(id: string): Promise<ITeacher | null> {
        try {
            const teacher = await this.teacher.findById(id);

            return teacher;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get all teachers
     */
    public async getAllTeachers(): Promise<ITeacher[] | null> {
        try {
            const teachers = await this.teacher.find();

            return teachers;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default TeacherService;
