import { Prisma } from '@prisma/client';

import prisma from '@services/client';

export class InstitutionService {
  public async institutionSignUp(institution: Prisma.InstitutionCreateInput) {
    const newInstitution = await prisma.institution.create({
      data: institution,
    });

    return {
      id: newInstitution.id,
      name: newInstitution.name,
      email: newInstitution.email,
      phone: newInstitution.phone,
      cnpj: newInstitution.cnpj,
      createdAt: newInstitution.createdAt,
      avatar: newInstitution.avatar,
    };
  }
}
