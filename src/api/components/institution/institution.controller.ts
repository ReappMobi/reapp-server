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

      const { password, email, name, phone, cnpj, displayName } = request.body;
      const hash = await bcrypt.hash(password, 12);

      const result = await institutionService.institutionSignUp({
        name,
        phone,
        cnpj,
        email,
        displayName,
        password: hash,
      });

      response.status(HttpStatus.CREATED);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },
};
