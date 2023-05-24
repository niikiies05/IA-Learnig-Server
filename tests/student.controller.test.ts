import request from 'supertest';
import App from '../src/app';
import { MongoMemoryServer } from 'mongodb-memory-server';
import StudentService from '@/resources/services/student/student.service';
import { initRoutes } from '@/resources/routes/routes';

jest.mock('@/resources/services/student/student.service');

const testApp = new App(Number(process.env.PORT || 3000));
initRoutes(testApp);
const app = testApp.express;

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await testApp.connectToDatabase(mongoServer.getUri());
});

afterAll(async () => {
    await testApp.closeDatabase();
    await mongoServer.stop();
});

describe('StudentController', () => {
    it('should create a student', async () => {
        const studentData = {
            name: 'John',
            surname: 'Doe',
            phone: '1234567890',
            email: 'john.doe@example.com',
            password: 'password',
            birthDate: new Date(),
        };

        const response = await request(app)
            .post('/api/students/create')
            .send(studentData);

        expect(response.status).toBe(201);
        expect(response.body).toMatchObject(studentData);
    });

    it('should update a student', async () => {
        const studentId = 'some-student-id';
        const updateData = {
            name: 'Jane',
            surname: 'Doe',
            phone: '0987654321',
        };

        (StudentService.prototype.updateStudent as jest.Mock).mockResolvedValue(
            {
                ...updateData,
                _id: studentId,
            }
        );

        const response = await request(app)
            .put(`/api/students/${studentId}`)
            .send(updateData);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(updateData);
    });

    it('should delete a student', async () => {
        const studentId = 'some-student-id';

        (StudentService.prototype.deleteStudent as jest.Mock).mockResolvedValue(
            true
        );

        const response = await request(app).delete(
            `/api/students/${studentId}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Student deleted successfully',
        });
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

        (StudentService.prototype.getStudent as jest.Mock).mockResolvedValue(
            mockStudent
        );

        const response = await request(app).get(`/api/students/${studentId}`);

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject(mockStudent);
    });

    // Ajoutez d'autres tests pour les autres routes du contrôleur étudiant
});
