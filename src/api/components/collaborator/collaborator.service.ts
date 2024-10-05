import admin from '@config/firebaseConfig';
import prisma from '@services/client';

export type PostCollaboratorType = {
  name: string;
  institutionId: number;
  file: { originalname: string; mimetype: string; buffer: Buffer };
};
export const postCollaboratorService = async ({
  name,
  file,
  institutionId,
}: PostCollaboratorType) => {
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
      'Erro no cadastro do colaborador, tente novamente mais tarde.',
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

  const collaborator = await prisma.collaborator.create({
    data: {
      name: name,
      institutionId,
      avatar: imageUrl,
    },
  });

  return collaborator;
};

export const getCollaboratorsByInstitutionIdService = async (
  institutionId: number,
) => {
  const collaborators = await prisma.collaborator.findMany({
    where: {
      institutionId: institutionId,
    },
  });

  return collaborators;
};
