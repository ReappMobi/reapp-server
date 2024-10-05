import admin from '@config/firebaseConfig';
import prisma from '@services/client';
export type PostPublicationData = {
  caption: string;
  file: { originalname: string; mimetype: string; buffer: Buffer };
  institutionId: number;
};

export const postPublicationService = async ({
  caption,
  file,
  institutionId,
}: PostPublicationData) => {
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
      'Erro no cadastro da publicação, tente novamente mais tarde.',
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

  const post = await prisma.post.create({
    data: {
      caption: caption,
      imageUrl: imageUrl,
      institutionId: institutionId,
    },
  });
  return post;
};

export const getAllPublicationsService = async () => {
  const posts = await prisma.post.findMany({
    select: {
      caption: true,
      id: true,
      imageUrl: true,
      createdAt: true,
      updatedAt: true,
      institution: {
        select: {
          avatar: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
};

export const getPublicationsByInstitutionService = async (
  institutionId: number,
) => {
  const posts = await prisma.post.findMany({
    select: {
      caption: true,
      id: true,
      imageUrl: true,
      updatedAt: true,
      institution: {
        select: {
          avatar: true,
          name: true,
        },
      },
    },
    where: { institutionId },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return posts;
};
