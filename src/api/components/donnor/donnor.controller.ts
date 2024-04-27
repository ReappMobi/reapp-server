import { Request, Response } from 'express';

import httpStatus from '@services/http-status';
import { DonnorService } from './donnor.service';

export const donnor = {
  async createDonnor(request: Request, response: Response) {
    const donnorService = new DonnorService();
    const donnor = request.body;
    const result = await donnorService.createDonnor(donnor);
    response.status(httpStatus.CREATED);
    response.send(result);
  },
};
