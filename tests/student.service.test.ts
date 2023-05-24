import StudentService from '@/resources/services/student/student.service';
import StudentModel from '@/resources/models/student/student.model';

jest.mock('@/resources/models/student/student.model');

describe('StudentService', () => {
    const studentService = new StudentService();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a student', async () => {
        const mockStudent = {
            name: 'John',
            surname: 'Doe',
            phone: '1234567890',
            email: 'john.doe@example.com',
            password: 'password',
            birthDate: new Date(),
        };

        (StudentModel.create as jest.Mock).mockResolvedValue(mockStudent);

        const createdStudent = await studentService.createStudent(mockStudent);

        expect(createdStudent).toMatchObject(mockStudent);
        expect(StudentModel.create).toHaveBeenCalledTimes(1);
    });

    it('should update a student', async () => {
        const studentId = 'some-student-id';
        const updateData = {
            name: 'Jane',
            surname: 'Doe',
            phone: '0987654321',
        };

        (StudentModel.findByIdAndUpdate as jest.Mock).mockResolvedValue({
            ...updateData,
            _id: studentId,
        });

        const updatedStudent = await studentService.updateStudent(
            studentId,
            updateData
        );

        expect(updatedStudent).toMatchObject(updateData);
        expect(StudentModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });

    it('should delete a student', async () => {
        const studentId = 'some-student-id';

        (StudentModel.findByIdAndDelete as jest.Mock).mockResolvedValue(true);

        const result = await studentService.deleteStudent(studentId);

        expect(result).toBeTruthy();
        expect(StudentModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });

    it('should get a student by ID', async () => {
        const studentId = 'some-student-id';
        const mockStudent = {
            _id: studentId,
            name: 'John',
            surname: 'Doe',
            phone: '1234567890',
            email: 'john.doe@example.com',
            password: 'password',
            birthDate: new Date(),
        };

        (StudentModel.findById as jest.Mock).mockResolvedValue(mockStudent);

        const foundStudent = await studentService.getStudent(studentId);

        expect(foundStudent).toMatchObject(mockStudent);
        expect(StudentModel.findById).toHaveBeenCalledTimes(1);
    });

    it('should get all students', async () => {
        const mockStudents = [
            {
                _id: 'some-student-id-1',
                name: 'John',
                surname: 'Doe',
                phone: '1234567890',
                email: 'john.doe@example.com',
                password: 'password',
                birthDate: new Date(),
            },
            {
                _id: 'some-student-id-2',
                name: 'Jane',
                surname: 'Doe',
                phone: '0987654321',
                email: 'jane.doe@example.com',
                password: 'password',
                birthDate: new Date(),
            },
        ];

        (StudentModel.find as jest.Mock).mockResolvedValue(mockStudents);

        const students = await studentService.getAllStudents();

        expect(students).toEqual(mockStudents);
        expect(StudentModel.find).toHaveBeenCalledTimes(1);
    });

    // Ajoutez d'autres tests pour les autres méthodes du service étudiant
});
