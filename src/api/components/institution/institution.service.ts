import { Prisma } from '@prisma/client';

import prisma from '@services/client';

export class InstitutionService {
  public async institutionSignUp(institution: Prisma.InstitutionCreateInput) {
    const newInstitution = await prisma.institution.create({
      data: institution,
      include: { profile: true },
    });

    const newInstitutionProfile = await prisma.institutionProfile.create({
      data: {
        displayName: institution.name,
        institution: { connect: { id: newInstitution.id } },
      },
    });

    return {
      id: newInstitution.id,
      name: newInstitution.name,
      email: newInstitution.email,
      phone: newInstitution.phone,
      cnpj: newInstitution.cnpj,
      createdAt: newInstitution.createdAt,
      profile: newInstitutionProfile,
    };
  }

  public async institutionSignIn(email: string) {
    const institution = await prisma.institution.findUnique({
      where: { email: email },
      include: { profile: true },
    });

    return {
      id: institution?.id,
      name: institution?.name,
      email: institution?.email,
      phone: institution?.phone,
      cnpj: institution?.cnpj,
      createdAt: institution?.createdAt,
      profile: institution?.profile,
    };
  }
}
