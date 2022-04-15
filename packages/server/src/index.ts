require('../.env');

import express from 'express';
import { Server, Logger } from './services';
import apiTest from './api/test';

const { APP_PORT } = process.env;
const app = express();

Server.configure(app);

apiTest(app);

const port = APP_PORT || 8082;
app.listen(port, () => Logger.info(`Server listening on ${port}`));
