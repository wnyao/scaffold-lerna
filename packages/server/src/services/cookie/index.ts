import { Request, Response, NextFunction } from 'express';

import { isPublicRoute } from '../../routes/util';
import { Logger } from '../logger';

export class Cookie {
  public static validate = async (req: Request, res: Response, next: NextFunction) => {
    const { path, cookies } = req;
    const isValidateRequired = !isPublicRoute(path);

    if (isValidateRequired) {
      const isCookiesValid = await this.verifyCookies(cookies);

      if (!isCookiesValid) {
        Logger.error('Failed to verify cookies');
        return res.status(401).send({ message: 'Unauthorized' });
      }
    }

    res.setHeader('WWW-Authenticate', 'Basic');
    Logger.info('Successfully validate cookies');
    return next();
  };

  static verifyCookies = (cookies: object) => {
    // TODO: if you decide to use cookie, any cookies validation
    return !!cookies || !cookies;
  };
}
