import HttpStatus from '@services/http-status';
import bcrypt from 'bcrypt';
import prisma from '@services/client';

import { Prisma } from '@prisma/client';
import { AppError } from 'utils/AppError';
import { Donor } from '../donnor/donor.type';

export type AuthData = {
  email: string;
  password: string;
  isDonor: boolean;
};

type InstitutionWithProfile = Prisma.InstitutionGetPayload<{
  include: { profile: true };
}>;

export const authenticate = async (data: AuthData) => {
  const { email, password, isDonor } = data;
  if (!email || !password) {
    throw new AppError(
      'Email and password are required',
      HttpStatus.BAD_REQUEST,
    );
  }

  let user: Donor | InstitutionWithProfile | null = null;
  if (isDonor) {
    user = (await prisma.donnor.findUnique({
      where: {
        email,
      },
    })) as Donor;
  } else {
    user = (await prisma.institution.findUnique({
      where: {
        email,
      },
      include: { profile: true },
    })) as InstitutionWithProfile;
  }

  if (!user) {
    throw new AppError('Email ou senha incorretos', HttpStatus.BAD_REQUEST);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError('Email ou senha incorretos', HttpStatus.BAD_REQUEST);
  }

  return user;
};
