import admin from '@config/firebaseConfig';
import prisma from '@services/client';

export type PostProjectData = {
  description: string;
  name: string;
  file: { originalname: string; mimetype: string; buffer: Buffer };
  institutionId: number;
  categoryId: number;
  subtitle: string;
};

export type favoriteProjectData = {
  projectId: number;
  donorId: number;
};

export const postProjectService = async ({
  description,
  name,
  categoryId,
  file,
  subtitle,
  institutionId,
}: PostProjectData) => {
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
    throw new Error('Erro no cadastro do projeto, tente novamente mais tarde.');
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

  const project = await prisma.project.create({
    data: {
      name: name,
      description: description,
      cover: imageUrl,
      categoryId: categoryId, // `categoryId` é uma referência direta
      institutionId: institutionId, // `institutionId` também deve ser uma referência direta
      subtitle: subtitle,
    },
  });
  return project;
};

export const getAllProjectsService = async (
  isDonor: boolean,
  donorId: number,
) => {
  let projects;
  if (isDonor) {
    const allProjects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        institutionId: true,
        categoryId: true,
        cover: true,
        description: true,
      },
    });

    const favoriteProjects = await prisma.favoriteProject.findMany({
      where: {
        donorId: donorId,
      },
      select: {
        projectId: true,
      },
    });

    const favoriteProjectIds = favoriteProjects.map((fp) => fp.projectId);

    projects = allProjects.map((project) => ({
      ...project,
      isFavorite: favoriteProjectIds.includes(project.id),
    }));
  } else {
    projects = await prisma.project.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        institutionId: true,
        categoryId: true,
        cover: true,
        description: true,
      },
    });
  }

  return projects;
};

export const getProjectByIdService = async (projectId: number) => {
  const project = await prisma.project.findFirst({
    where: { id: projectId },
  });

  return project;
};

export const getProjectsByInstitutionService = async (
  institutionId: number,
) => {
  const projects = await prisma.project.findMany({
    where: {
      institutionId: institutionId,
    },
  });

  return projects;
};

export const getProjectCategoriesService = async () => {
  const categories = await prisma.categoryProject.findMany();
  return categories;
};

export const toggleFavoriteService = async ({
  projectId,
  donorId,
}: favoriteProjectData) => {
  const existingFavorite = await prisma.favoriteProject.findUnique({
    where: {
      donorId_projectId: {
        donorId: donorId,
        projectId: projectId,
      },
    },
  });

  if (existingFavorite) {
    await prisma.favoriteProject.delete({
      where: {
        donorId_projectId: {
          donorId: donorId,
          projectId: projectId,
        },
      },
    });
  } else {
    await prisma.favoriteProject.create({
      data: {
        projectId: projectId,
        donorId: donorId,
      },
    });
  }
};

export const getFavoriteProjectService = async (donorId: number) => {
  const favoriteProjects = await prisma.favoriteProject.findMany({
    where: {
      donorId: donorId,
    },
    include: {
      project: true,
    },
  });

  const projects = favoriteProjects.map((favorite) => favorite.project);

  return projects;
};
