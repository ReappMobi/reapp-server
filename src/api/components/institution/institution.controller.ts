import { Request, Response, NextFunction } from 'express';

import HttpStatus from '@services/http-status';
import { validationResult } from 'express-validator';
import { AppError } from 'utils/AppError';
import bcrypt from 'bcrypt';
import { InstitutionService } from './institution.service';
import jwt from 'jsonwebtoken';

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

      const { password, email, name, phone, cnpj } = request.body;
      const hash = await bcrypt.hash(password, 12);

      const result = await institutionService.institutionSignUp({
        name,
        phone,
        cnpj,
        email,
        password: hash,
      });

      response.status(HttpStatus.CREATED);
      response.send(result);
    } catch (error) {
      next(error);
    }
  },

  async institutionSignIn(
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

      const user = await institutionService.institutionSignIn(
        request.body.email,
      );

      const secretKey = process.env.JWT_SECRET;

      if (!secretKey) {
        throw new AppError(
          'Chave secreta JWT não configurada',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const token = jwt.sign({ userId: user?.id }, secretKey, {
        expiresIn: '7d',
      });

      response.status(HttpStatus.ACCEPTED);
      response.send({ user: user, token });
    } catch (error) {
      next(error);
    }
  },
};
