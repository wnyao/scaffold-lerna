import { Request, Response, NextFunction } from 'express';
import logger from './winston';

interface IHandlerParams {
  req: Request;
  res: Response;
  start: [number, number];
}

export class Logger {
  public static info = logger.info;
  public static debug = logger.debug;
  public static warn = logger.warn;
  public static error = logger.error;

  public static init = () => {
    // eslint-disable-next-line no-console
    console.clear();
    return this.setupListener;
  };

  private static setupListener = (req: Request, res: Response, next: NextFunction) => {
    const start = process.hrtime();
    const { method, originalUrl } = req;
    logger.warn(`Incoming request ${method} ${originalUrl}`);

    res.on('finish', () => this.handleFinish({ req, res, start }));
    res.on('error', () => this.handleError({ req, res, start }));
    next();
  };

  private static handleFinish = ({ req, res, start }: IHandlerParams) => {
    const { statusCode } = res;
    const { method, originalUrl } = req;

    if (statusCode > 400) {
      res.emit('error');
      return;
    }

    logger.info(`${method} ${statusCode} ${originalUrl} ${this.getDuration(start)}`);
  };

  private static handleError = ({ req, res, start }: IHandlerParams) => {
    const { statusCode } = res;
    const { method, originalUrl } = req;

    logger.error(`${method} ${statusCode} ${originalUrl} ${this.getDuration(start)}`);
  };

  private static getDuration = (start: [number, number]) => {
    const NS_PER_SEC = 1e9;
    const NS_TO_MS = 1e6;
    const diff = process.hrtime(start);
    const durationInMS = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;

    return `${durationInMS.toLocaleString()} ms`;
  };
}
