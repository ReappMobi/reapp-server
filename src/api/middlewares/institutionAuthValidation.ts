import { body, check } from 'express-validator';
import prisma from '@services/client';
import { validateCNPJ } from 'utils/validations';

export const signUpValidation = () => {
  return [
    check('email')
      .isEmail()
      .withMessage('Por favor, insira um email válido')
      .normalizeEmail()
      .trim()
      .custom(async (value) => {
        const user = await prisma.institution.findUnique({
          where: { email: value },
        });
        if (user) {
          return Promise.reject(new Error('E-mail já está em uso'));
        }
      }),

    body('password')
      .exists({ checkFalsy: true })
      .withMessage('Você deve digitar uma senha')
      .isLength({ min: 8 })
      .withMessage('A senha deve conter no mínimo 8 caracteres')
      .trim(),
    body('confirmPassword')
      .exists({ checkFalsy: true })
      .withMessage('Você deve digitar uma senha de confirmação')
      .custom((value, { req }) => {
        return value === req.body.password;
      })
      .withMessage('A senha e a senha de confirmação devem ser iguais')
      .trim(),

    body('cnpj')
      .exists({ checkFalsy: true })
      .withMessage('Você deve digitar o CNPJ')
      .custom(async (value) => {
        if (!validateCNPJ(value)) {
          return Promise.reject(new Error('O CNPJ informado não é válido'));
        }
        const existCNPJ = await prisma.institution.findUnique({
          where: { cnpj: value },
        });
        if (existCNPJ) {
          return Promise.reject(new Error('O CNPJ informado já está em uso'));
        }
        return true;
      })
      .trim(),

    body('phone')
      .exists({ checkFalsy: true })
      .withMessage('Você deve digitar um número de telefone')
      .custom((value) => {
        if (!/^[1-9]{2}9[0-9]{4}[0-9]{4}$/.test(value)) {
          return Promise.reject(new Error('O telefone informado não é válido'));
        }
        return true;
      })
      .trim(),
  ];
};
