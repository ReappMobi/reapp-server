import admin from '@config/firebaseConfig';
import prisma from '@services/client';

export type PostPartnerType = {
  name: string;
  institutionId: number;
  file: { originalname: string; mimetype: string; buffer: Buffer };
};
export const postPartnerService = async ({
  name,
  file,
  institutionId,
}: PostPartnerType) => {
  if (!file) {
    throw new Error('A imagem é obrigatória');
  }

  const bucket = admin.storage().bucket();
  const blob = bucket.file(file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  blobStream.on('error', () => {
    throw new Error(
      'Erro no cadastro do parceiro, tente novamente mais tarde.',
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

  blobStream.end(file.buffer);

  const imageUrl = await getUrl;

  const partner = await prisma.partner.create({
    data: {
      name: name,
      institutionId,
      avatar: imageUrl,
    },
  });

  return partner;
};

export const getPartnersByInstitutionIdService = async (
  institutionId: number,
) => {
  const partners = await prisma.partner.findMany({
    where: {
      institutionId: institutionId,
    },
  });

  return partners;
};
