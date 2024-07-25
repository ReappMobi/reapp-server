import { Request, Response, NextFunction } from 'express';

import HttpStatus from '@services/http-status';
import { validationResult } from 'express-validator';
import { AppError } from 'utils/AppError';
import bcrypt from 'bcrypt';
import { InstitutionService } from './institution.service';

export const institution = {
  async institutionSignUp(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        throw new AppError(errors.array()[0].msg, HttpStatus.BAD_REQUEST);
      }
      const institutionService = new InstitutionService();

      const {
        password,
        email,
        name,
        phone,
        cnpj,
        state,
        city,
        category,
        facebook,
        instagram,
      } = request.body;
      const hash = await bcrypt.hash(password, 12);

      const result = await institutionService.institutionSignUp({
        name,
        phone,
        cnpj,
        email,
        state,
        city,
        category,
        ...(instagram && { instagram }),
        ...(facebook && { facebook }),
        password: hash,
      });

      response.status(HttpStatus.CREATED);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },

  async editInformation(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        throw new AppError(errors.array()[0].msg, HttpStatus.BAD_REQUEST);
      }

      const { institutionId, name, phone } = request.body;
      const image = request.file;

      if (!name && !phone && !image) {
        throw new AppError(
          'Nenhuma alteração foi feita.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = {
        id: parseInt(institutionId, 10),
        ...(name && { name }),
        ...(phone && { phone }),
        ...(image && { avatar: image }),
      };

      const institutionService = new InstitutionService();
      const result = await institutionService.institutionEditInformation(data);
      response.status(HttpStatus.CREATED);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },

  async getInstitutionByid(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const id = parseInt(request.params.id, 10);
      const institutionService = new InstitutionService();
      const result = await institutionService.getInstitutionById(id);
      response.status(HttpStatus.OK);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },

  async getAllInstitution(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const institutionService = new InstitutionService();
      const result = await institutionService.getAllInstitutions();
      response.status(HttpStatus.OK);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },
};
