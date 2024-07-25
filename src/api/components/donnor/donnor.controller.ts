import { Request, Response, NextFunction } from 'express';

import httpStatus from '@services/http-status';
import {
  createDonnor,
  createDonnorGoogle,
  editInformation,
} from './donnor.service';
import { Donor } from './donor.type';
import { validationResult } from 'express-validator';
import { AppError } from 'utils/AppError';
import HttpStatus from '@services/http-status';

export const donnor = {
  async createDonnor(request: Request, response: Response, next: NextFunction) {
    const donnor = request.body as Donor;
    try {
      const result = await createDonnor(donnor);
      response.status(httpStatus.CREATED);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },

  async createDonnorGoogle(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const result = await createDonnorGoogle(request.body);
      response.status(httpStatus.CREATED);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },

  async editInformationDonor(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        throw new AppError(errors.array()[0].msg, HttpStatus.BAD_REQUEST);
      }

      const { donorId, name, phone } = request.body;
      const image = request.file;

      if (!name && !phone && !image) {
        throw new AppError(
          'Nenhuma alteração foi feita.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = {
        id: parseInt(donorId, 10),
        ...(name && { name }),
        ...(phone && { phone }),
        ...(image && { avatar: image }),
      };

      const result = await editInformation(data);
      response.status(HttpStatus.CREATED);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },
};
