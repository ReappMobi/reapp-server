import express, { Express } from 'express';

import { API_ROOT_PATH } from '@config/consts';
import router from '@api/routes';
import errorHandling from '@api/middlewares/error-handling';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(API_ROOT_PATH, router);

app.use(errorHandling);

export default app;
