import { Prisma } from '@prisma/client';

import HttpStatus from '@services/http-status';
import prisma from '@services/client';

import { AppError } from 'utils/AppError';

export class DonnorService {
  public async createDonnor(donnor: Prisma.DonnorCreateInput) {
    const donnorExists = await prisma.donnor.findUnique({
      where: {
        email: donnor.email,
      },
    });

    if (donnorExists) {
      throw new AppError('email já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const newDonnor = await prisma.donnor.create({ data: donnor });

    return {
      id: newDonnor.id,
      name: newDonnor.name,
      email: newDonnor.email,
      createdAt: newDonnor.createdAt,
    };
  }
}
