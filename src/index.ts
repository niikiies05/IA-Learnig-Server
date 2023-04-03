import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import { initRoutes } from '@/resources/routes/routes';

validateEnv();

const app = new App(Number(process.env.PORT));

initRoutes(app);

app.listen();
