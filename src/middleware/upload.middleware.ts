import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadFile = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    upload.single('file')(req, res, (err: any) => {
        if (err) {
            return res.status(400).json({ message: 'Error uploading file' });
        }
        next();
    });
};
