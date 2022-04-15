import { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptionsDelegate } from 'cors';
import cookieParser from 'cookie-parser';
import responseTime from 'response-time';

import { Cookie } from '../cookie';
import { Logger } from '../logger';

const { NODE_ENV, APP_PORT = 8082 } = process.env;
const isDevelopment = NODE_ENV === 'development';
const whiteList = [`http://localhost:${APP_PORT}`];

export class Server {
  public static configure(app: Application) {
    app.use(Logger.init());
    app.use(responseTime());
    app.use(cookieParser());
    app.use(Cookie.validate);
    app.use(bodyParser.json());

    app.use(cors(this.getCorsOptions), (_: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
  }

  private static getCorsOptions: CorsOptionsDelegate<Request> = (req, callback) => {
    const current = req.header('Origin');
    const isAllowed = isDevelopment || whiteList.includes(current || '');
    const error = isAllowed ? null : new Error('Not allowed by CORS');

    callback(error, { origin: isAllowed, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', optionsSuccessStatus: 204 });
  };
}
