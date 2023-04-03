import StudentModel from '@/resources/models/student/student.model';
import { ICohort } from '@/resources/interfaces/cohort/cohort.interface';
import IStudent from '@/resources/interfaces/student/student.interface';

class StudentService {
    private student = StudentModel;

    public async createStudent(
        studentData: Partial<IStudent>
    ): Promise<IStudent> {
        try {
            const student = await this.student.create(studentData);
            return student;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async updateStudent(
        id: string,
        studentData: Partial<IStudent>
    ): Promise<IStudent | null> {
        try {
            const student = await this.student.findByIdAndUpdate(
                id,
                studentData,
                { new: true }
            );
            return student;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getStudent(id: string): Promise<IStudent | null> {
        try {
            const student = await this.student.findById(id);
            return student;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getAllStudents(): Promise<IStudent[]> {
        try {
            const students = await this.student.find({});
            return students;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getStudentsByCohort(
        cohortId: ICohort['_id']
    ): Promise<IStudent[]> {
        try {
            const students = await this.student.find({ cohorts: cohortId });
            return students;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getStudentByEmail(email: string): Promise<IStudent | null> {
        try {
            const student = await this.student.findOne({ email });
            return student;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async deleteStudent(id: string): Promise<IStudent | null> {
        try {
            const student = await this.student.findByIdAndDelete(id);
            return student;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default StudentService;
