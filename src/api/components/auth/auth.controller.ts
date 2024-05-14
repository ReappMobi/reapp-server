import { Request, Response, NextFunction } from 'express';

import { authenticate } from './auth.service';
import { AppError } from 'utils/AppError';

import HttpStatus from '@services/http-status';
import jwt from 'jsonwebtoken';

export const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const user = await authenticate(request.body);

    const jwtSecretKey = process.env.JWT_SECRET;
    if (!jwtSecretKey) {
      throw new AppError(
        'JWT secret key not found',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const token = jwt.sign({ id: user.id }, jwtSecretKey, {
      expiresIn: '7d',
    });
    response.status(HttpStatus.OK).json({
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
