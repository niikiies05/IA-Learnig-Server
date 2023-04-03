import { Request, Response, NextFunction } from 'express';
import csvParser from 'csv-parser';
import { readFile } from 'fs/promises';
import { utils, WorkBook, WorkSheet, readFile as readXlsxFile } from 'xlsx';
import StudentService from '@/resources/services/student/student.service';
import HttpException from '@/utils/exceptions/http.exception';
import IStudent from '@/resources/interfaces/student/student.interface';
import { ICohort } from '@/resources/interfaces/cohort/cohort.interface';

const studentService = new StudentService();

interface CSVStudent {
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
    birthDate: Date;
    interests: string[];
    navigationHistory: any[];
    cohorts: ICohort['_id'][];
}

function validateAndTransformExcelData(excelData: unknown): Partial<IStudent> {
    if (typeof excelData !== 'object' || excelData === null) {
        throw new Error('Invalid data format');
    }

    const {
        name,
        surname,
        phone,
        email,
        birthDate,
        interests,
        navigationHistory,
        cohorts,
    } = excelData as Record<string, unknown>;

    if (!name || !surname || !phone || !email) {
        throw new Error('Missing required fields');
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email as string)) {
        throw new Error('Invalid email format');
    }

    if (!(birthDate instanceof Date) || isNaN(birthDate.getTime())) {
        throw new Error('Invalid birth date');
    }

    if (
        !Array.isArray(interests) ||
        !interests.every((item) => typeof item === 'string')
    ) {
        throw new Error('Invalid interests format');
    }

    if (!Array.isArray(navigationHistory)) {
        throw new Error('Invalid navigation history format');
    }

    if (
        !Array.isArray(cohorts) ||
        !cohorts.every((item) => typeof item === 'string')
    ) {
        throw new Error('Invalid cohort IDs format');
    }

    return {
        name: name as string,
        surname: surname as string,
        phone: phone as string,
        email: email as string,
        birthDate: birthDate as Date,
        interests: interests as string[],
        navigationHistory: navigationHistory as any[],
        cohorts: cohorts as ICohort['_id'][],
    };
}

const importStudentsFromCSV = async (fileBuffer: Buffer): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const parser = csvParser({ separator: ',' });
        const students: CSVStudent[] = [];

        parser.on('data', (data) => {
            students.push(data);
        });

        parser.on('end', async () => {
            try {
                for (const student of students) {
                    if (student.email) {
                        const existingStudent =
                            await studentService.getStudentByEmail(
                                student.email
                            );
                        if (!existingStudent) {
                            await studentService.createStudent(student);
                        }
                    }
                }
                resolve();
            } catch (error) {
                reject(error);
            }
        });

        parser.on('error', (error) => {
            reject(error);
        });

        parser.write(fileBuffer);
        parser.end();
    });
};

const importStudentsFromExcel = async (fileBuffer: Buffer): Promise<void> => {
    const workbook: WorkBook = readXlsxFile(fileBuffer.toString(), {
        type: 'buffer',
    });
    const sheetName: string = workbook.SheetNames[0];
    const sheet: WorkSheet = workbook.Sheets[sheetName];
    const rawData = utils.sheet_to_json(sheet);
    const students: Partial<IStudent>[] = rawData.map(
        validateAndTransformExcelData
    );

    for (const student of students) {
        if (student.email) {
            const existingStudent = await studentService.getStudentByEmail(
                student.email
            );
            if (!existingStudent) {
                await studentService.createStudent(student);
            }
        }
    }
};

export const importStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: 'No file provided' });
        }

        const { buffer, originalname } = req.file;
        const fileExtension = originalname.split('.').pop()?.toLowerCase();

        if (fileExtension === 'csv') {
            await importStudentsFromCSV(buffer);
        } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            await importStudentsFromExcel(buffer);
        } else {
            return res.status(400).json({ message: 'Invalid file format' });
        }

        res.status(200).json({ message: 'Students imported successfully' });
    } catch (error: any) {
        next(new HttpException(400, error.message));
    }
};
