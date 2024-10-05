import request from 'supertest';

import { test, describe } from 'vitest';

import app from '@app';
import HttpStatus from '@services/http-status';

describe('Healthcheck Route', () => {
  test('GET /api/health should return status code 200', async () => {
    await request(app).get('/api/health').expect(HttpStatus.OK);
  });
});
