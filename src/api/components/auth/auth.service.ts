import HttpStatus from '@services/http-status';
import bcrypt from 'bcrypt';
import prisma from '@services/client';

import { AppError } from 'utils/AppError';
import { Donor, DonorResponse } from '../donnor/donor.type';
import {
  serializeDonorResponse,
  serializeInstitutionResponse,
} from 'utils/serilizers';
import {
  Institution,
  InstitutionResponse,
} from '../institution/institution.types';

export type AuthData = {
  email: string;
  password: string;
  isDonor: boolean;
};

export const authenticate = async (data: AuthData) => {
  const { email, password, isDonor } = data;
  if (!email || !password) {
    throw new AppError(
      'Email and password are required',
      HttpStatus.BAD_REQUEST,
    );
  }

  let userResponse: DonorResponse | InstitutionResponse | null = null;
  let user: Donor | Institution | null = null;

  if (isDonor) {
    user = (await prisma.donnor.findUnique({
      where: {
        email,
      },
    })) as Donor;
    if (!user) {
      throw new AppError('Email ou senha incorretos', HttpStatus.BAD_REQUEST);
    }
    userResponse = serializeDonorResponse(user as Donor);
  } else {
    user = (await prisma.institution.findUnique({
      where: {
        email,
      },
    })) as Institution;
    if (!user) {
      throw new AppError('Email ou senha incorretos', HttpStatus.BAD_REQUEST);
    }
    userResponse = serializeInstitutionResponse(user as Institution);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError('Email ou senha incorretos', HttpStatus.BAD_REQUEST);
  }

  return userResponse;
};
