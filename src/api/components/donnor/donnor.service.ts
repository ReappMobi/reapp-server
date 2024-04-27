import { Prisma, PrismaClient } from '@prisma/client';

export class DonnorService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async createDonnor(donnor: Prisma.DonnorCreateInput) {
    return await this.prisma.donnor.create({ data: donnor });
  }
}
