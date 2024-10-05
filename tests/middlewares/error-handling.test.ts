import { Request, NextFunction } from 'express';

import { test, describe, expect, vi } from 'vitest';

import HttpStatus from '@services/http-status';
import errorHandling from '@api/middlewares/error-handling';
import { ErrorHandler } from 'utils/error-handler';

describe('Healthcheck Route', () => {
  test('should delegate error to the centralized error handler and send 500 response', () => {
    const error = new Error('Test error');

    const response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    const next = vi.fn();

    const spyResponse = vi.spyOn(response, 'status');
    const spyError = vi.spyOn(ErrorHandler, 'handle');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorHandling(error, {} as Request, response as any, next as NextFunction);
    expect(spyError).toHaveBeenCalledWith(error);
    expect(spyResponse).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
