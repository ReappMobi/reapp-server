import logger from '@services/logger';

export class ErrorHandler {
  public static handle(error: Error) {
    logger.error(error);
  }

  public static isTrustedError(error: Error) {
    return error.name === 'AppError';
  }
}
