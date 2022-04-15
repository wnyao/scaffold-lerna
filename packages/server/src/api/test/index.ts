import express, { Application } from 'express';
import ROUTES from '../../routes';

import apiTest from './test';

const router = express.Router();

apiTest(router);

export default (app: Application) => app.use(ROUTES.TEST, router);
