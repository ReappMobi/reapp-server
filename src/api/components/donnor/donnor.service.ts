import { Prisma } from '@prisma/client';
import HttpStatus from '@services/http-status';
import prisma from '@services/client';
import bcrypt from 'bcrypt';
import { AppError } from 'utils/AppError';
import { OAuth2Client } from 'google-auth-library';
import admin from '@config/firebaseConfig';

export type DonnorSignUpData = {
  idToken: string;
};

interface Avatar {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

interface EditInformationData {
  id: number;
  avatar?: Avatar;
}

//Botar no .env
const client = new OAuth2Client(
  '831403833609-voubrli7i5ei1qqr4pmu3sgpq7k9b3mc.apps.googleusercontent.com',
);

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

export const createDonnorGoogle = async (data: DonnorSignUpData) => {
  const { idToken } = data;

  // Verifica o token de acesso com o Google
  const ticket = await client.verifyIdToken({
    idToken,
  });

  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error('Não foi possível autenticar. Tente novamente mais tarde.');
  }

  const email = payload['email'];
  const name = payload['name'];
  const avatar = payload['picture']; // ou outra informação relevante do usuário

  // Verifica se o usuário já existe no banco de dados pelo email
  const donnorExists = await prisma.donnor.findUnique({
    where: {
      email: email,
    },
  });

  if (donnorExists) {
    throw new AppError('email já cadastrado', HttpStatus.BAD_REQUEST);
  }

  // Se o usuário não existir, cria um novo registro
  if (!donnorExists) {
    if (email && name && avatar) {
      const newDonnor = await prisma.donnor.create({
        data: {
          email,
          name,
          avatar,
          password: idToken,
          // Outros campos que desejar salvar
        },
      });
      return {
        id: newDonnor.id,
        name: newDonnor.name,
        email: newDonnor.email,
        createdAt: newDonnor.createdAt,
      };
    } else {
      throw new AppError(
        'Falha na autenticação. Tente novamente mais tarde',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
};

export const editInformation = async (data: EditInformationData) => {
  if (data.avatar) {
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

  const updatedDonor = await prisma.donnor.update({
    where: { id: data.id },
    data: data,
  });
  return updatedDonor;
};
