import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import HttpStatus from '@services/http-status';
import { AppError } from 'utils/AppError';
import { PaymentService } from './payment.service';

export const payment = {
  async requestPaymentInstitution(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      //TODO: middlware for request payment
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        throw new AppError(errors.array()[0].msg, HttpStatus.BAD_REQUEST);
      }

      const paymentService = new PaymentService();

      const result = await paymentService.requestPaymentInstitutionUrl(
        request.body,
      );

      response.status(HttpStatus.ACCEPTED);
      response.send({ result });
    } catch (error) {
      next(error);
    }
  },
  async paymentCallback(
    request: Request,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const paymentService = new PaymentService();

      await paymentService.paymentCallback(request.body);

      response.status(HttpStatus.ACCEPTED);
      response.send();
    } catch (error) {
      next(error);
    }
  },
};
