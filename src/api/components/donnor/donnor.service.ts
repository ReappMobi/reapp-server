import { Prisma } from '@prisma/client';
import HttpStatus from '@services/http-status';
import prisma from '@services/client';
import bcrypt from 'bcrypt';
import { AppError } from 'utils/AppError';

export const createDonnor = async (donnor: Prisma.DonnorCreateInput) => {
  const { password, email } = donnor;

  const donnorExists = await prisma.donnor.findUnique({
    where: {
      email: email,
    },
  });

  if (donnorExists) {
    throw new AppError('email já cadastrado', HttpStatus.BAD_REQUEST);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newDonnor = await prisma.donnor.create({
    data: {
      ...donnor,
      password: hashedPassword,
    },
  });

  return {
    id: newDonnor.id,
    name: newDonnor.name,
    email: newDonnor.email,
    createdAt: newDonnor.createdAt,
  };
};
