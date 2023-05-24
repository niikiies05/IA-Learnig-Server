import express, { Application } from 'express';
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Controller from '@/utils/interfaces/controller.interface';
import ErrorMiddleware from '@/middleware/error.middleware';
import helmet from 'helmet';
import { navigationHistoryMiddleware } from '@/middleware/navigationHistory.middleware';

mongoose.set('strictQuery', false); // Ou utilisez `true` pour conserver le comportement actuel.

class App {
    public express: Application;
    public port: number;

    constructor(port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
        this.express.use(navigationHistoryMiddleware);
    }

    public initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        this.express.use(ErrorMiddleware);
    }

    public async connectToDatabase(uri?: string): Promise<void> {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
        const mongoDBConnectionString =
            uri || `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;

        try {
            await mongoose.connect(mongoDBConnectionString);
            console.log('Connected to MongoDB...');
        } catch (err) {
            console.error('Could not connect to MongoDB...', err);
        }
    }

    private initialiseDatabaseConnection(): void {
        this.connectToDatabase();
    }

    public async closeDatabase(): Promise<void> {
        await mongoose.connection.close();
    }

    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;
