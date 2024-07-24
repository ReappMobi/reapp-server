import request from 'supertest';

import { test, describe, expect, vi, beforeEach } from 'vitest';

import app from '@app';
import HttpStatus from '@services/http-status';
import bcrypt from 'bcrypt';
import prisma from '../helpers/prisma';

vi.mock('@test/mocks/prisma.mock.ts');

describe('Test auth route', () => {
  describe('[POST] /api/auth (donor)', () => {
    beforeEach(async () => {
      process.env.JWT_SECRET = 'super_secret';
      await prisma.donnor.create({
        data: {
          name: 'Reapp Test',
          email: 'test@reapp.com.br',
          password: bcrypt.hashSync('super_test', 10),
        },
      });
    });

    test('should return 200 and a token for valid credentials (donor)', async () => {
      const response = await request(app).post('/api/auth').send({
        email: 'test@reapp.com.br',
        password: 'super_test',
        isDonor: true,
      });

      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
    });

    test('should return 400 for invalid credentials (donor)', async () => {
      const response = await request(app).post('/api/auth').send({
        email: 'test@reapp.com.br',
        password: 'super_test1',
        isDonor: true,
      });
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });

    test('should return 400 for missing credentials (donor)', async () => {
      const response = await request(app).post('/api/auth').send({
        email: 'test@reapp.com.br',
        isDonor: true,
      });
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  describe('[POST] /api/auth (institution)', () => {
    beforeEach(async () => {
      await prisma.institution.create({
        data: {
          name: 'Reapp Test',
          email: 'test@reapp.com.br',
          password: bcrypt.hashSync('super_test', 10),
          cnpj: '123456789',
          phone: '123456789',
          displayName: 'Reapp Test',
        },
      });
    });

    test('should return 200 and a token for valid credentials (institution)', async () => {
      const response = await request(app).post('/api/auth').send({
        email: 'test@reapp.com.br',
        password: 'super_test',
        isDonor: false,
      });
      expect(response.status).toBe(HttpStatus.OK);
      expect(response.body.token).toBeDefined();
      expect(response.body.user).toBeDefined();
    });

    test('should return 400 for invalid credentials (institution)', async () => {
      const response = await request(app).post('/api/auth').send({
        email: 'test@reapp.com.br',
        password: 'super_test1',
        isDonor: false,
      });
      expect(response.status).toBe(HttpStatus.BAD_REQUEST);
    });
  });

  test('should return 500 if JWT_SECRET is not set', async () => {
    process.env.JWT_SECRET = '';
    const response = await request(app).post('/api/auth').send({
      email: 'test@reapp.com.br',
      isDonor: true,
    });
    expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});
