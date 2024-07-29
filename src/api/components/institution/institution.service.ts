import { Prisma } from '@prisma/client';
import admin from '@config/firebaseConfig';
import prisma from '@services/client';
import { serializeInstitutionResponse } from 'utils/serilizers';
import { Institution } from '../institution/institution.types';

interface Avatar {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

interface EditInformationData {
  id: number;
  avatar?: Avatar | string;
}

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
      state: newInstitution.state,
      city: newInstitution.city,
      category: newInstitution.categoryId,
      instagram: newInstitution.instagram,
      facebook: newInstitution.facebook,
    };
  }

  public async institutionEditInformation(data: EditInformationData) {
    if (data.avatar && typeof data.avatar !== 'string') {
      const bucket = admin.storage().bucket();
      const blob = bucket.file(data.avatar.originalname);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: data.avatar.mimetype,
        },
      });

      blobStream.on('error', () => {
        throw new Error(
          'Erro na edição de informações, tente novamente mais tarde.',
        );
      });

      const getUrl = new Promise<string>((resolve, reject) => {
        blobStream.on('finish', async () => {
          try {
            const [publicUrl] = await blob.getSignedUrl({
              action: 'read',
              expires: '01-01-2100',
            });
            resolve(publicUrl);
          } catch (error) {
            reject(error);
          }
        });
      });
      blobStream.end(data.avatar.buffer);
      const imageUrl = await getUrl;

      data.avatar = imageUrl;
    }

    const updatedInstitution = await prisma.institution.update({
      where: { id: data.id },
      data: data,
    });
    return updatedInstitution;
  }

  public async getInstitutionById(id: number) {
    const result = await prisma.institution.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!result) {
      throw new Error(`Institution with ID ${id} not found`);
    }

    const userResponse = serializeInstitutionResponse(
      result as Institution & { category: { name: string } },
    );
    return userResponse;
  }

  public async getAllInstitutions() {
    const result = await prisma.institution.findMany({
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return result.map((institution) =>
      serializeInstitutionResponse(
        institution as Institution & { category: { name: string } },
      ),
    );
  }

  public async getInstitutionCategories() {
    const result = await prisma.categoryInstitution.findMany();
    return result;
  }
}
