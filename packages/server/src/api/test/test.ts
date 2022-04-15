import { Router, Request, Response } from 'express';

const test = async (_: Request, res: Response) => {
  return res.status(200).send('OK');
};

export default async (router: Router) => router.get('/', test);
