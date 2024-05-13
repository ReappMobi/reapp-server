import { Request, Response, NextFunction } from 'express';

import httpStatus from '@services/http-status';
import { createDonnor } from './donnor.service';

interface Donnor {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const donnor = {
  async createDonnor(request: Request, response: Response, next: NextFunction) {
    const donnor = request.body as Donnor;
    try {
      const result = await createDonnor(donnor);
      response.status(httpStatus.CREATED);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },
};
