import { Request, Response, NextFunction } from 'express';

import httpStatus from '@services/http-status';
import { DonnorService } from './donnor.service';

export const donnor = {
  async createDonnor(request: Request, response: Response, next: NextFunction) {
    const donnorService = new DonnorService();
    const donnor = request.body;
    try {
      const result = await donnorService.createDonnor(donnor);
      response.status(httpStatus.CREATED);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },
};
