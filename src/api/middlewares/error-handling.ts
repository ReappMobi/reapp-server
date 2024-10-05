import { Response, Request, NextFunction } from 'express';

import httpStatus from '@services/http-status';
import { ErrorHandler } from 'utils/error-handler';

const errorHandling = (
  error: Error,
  _: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __: NextFunction,
) => {
  ErrorHandler.handle(error);

  let statusCode: number;
  let responseError: string;

  if (ErrorHandler.isTrustedError(error)) {
    statusCode = (error as AppError).statusCode;
    responseError = (error as AppError).message;
  } else {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    responseError = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  // TODO: Migrar para uma interface de `Error` seguindo o padrão do Mastodon.
  // Referência: https://docs.joinmastodon.org/entities/Error/
  response.status(statusCode).json({
    error: responseError,
  });
};

export default errorHandling;
