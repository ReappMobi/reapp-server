import { Request, Response } from 'express';
import httpStatus from '@services/http-status';

export const healthcheck = (_: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ status: 'OK', data: new Date().toJSON() });
};
