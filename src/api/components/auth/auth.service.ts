import HttpStatus from '@services/http-status';
import bcrypt from 'bcrypt';
import prisma from '@services/client';
import { OAuth2Client } from 'google-auth-library';
import { AppError } from 'utils/AppError';
import { Donor, DonorResponse } from '../donnor/donor.type';
import {
  serializeDonorResponse,
  serializeInstitutionResponse,
} from 'utils/serilizers';
import {
  Institution,
  InstitutionResponse,
} from '../institution/institution.types';

export type AuthData = {
  email: string;
  password: string;
  isDonor: boolean;
};

export type AuthGoogleData = {
  idToken: string;
  clientId: string;
};

//Botar no .env
const client = new OAuth2Client(
  '831403833609-voubrli7i5ei1qqr4pmu3sgpq7k9b3mc.apps.googleusercontent.com',
);
export const authenticate = async (data: AuthData) => {
  const { email, password, isDonor } = data;
  if (!email || !password) {
    throw new AppError(
      'Email and password are required',
      HttpStatus.BAD_REQUEST,
    );
  }

  let userResponse: DonorResponse | InstitutionResponse | null = null;

  let user: Donor | Institution | null = null;

  if (isDonor) {
    user = (await prisma.donnor.findUnique({
      where: {
        email,
      },
    })) as Donor;
    if (user) {
      userResponse = serializeDonorResponse(user as Donor);
    }
  } else {
    user = (await prisma.institution.findUnique({
      where: {
        email,
      },
    })) as Institution;
    if (user) {
      userResponse = serializeInstitutionResponse(user as Institution);
    }
  }

  if (!user) {
    throw new AppError('Email ou senha incorretos', HttpStatus.BAD_REQUEST);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new AppError('Email ou senha incorretos', HttpStatus.BAD_REQUEST);
  }

  return userResponse;
};

export const authenticateGoogle = async (data: AuthGoogleData) => {
  const { idToken } = data;
  // Verifica o token de ID com o cliente do Google
  const ticket = await client.verifyIdToken({
    idToken: idToken,
  });

  // Extrai informações do payload do token
  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('Não foi possível autenticar. Tente novamente mais tarde.');
  }

  //const userId = payload.sub;
  //TODO: verificar se é igual ao clientId que veio na req
  const email = payload.email;

  let user: Donor | null = null;
  let userResponse: DonorResponse | null = null;

  // Procura o usuário pelo e-mail no banco de dados
  user = (await prisma.donnor.findUnique({
    where: {
      email,
    },
  })) as Donor;

  // Se encontrar o usuário, serializa a resposta
  if (user) {
    userResponse = serializeDonorResponse(user);
  } else {
    // Se não encontrar, lança um erro
    throw new AppError('Usuário não possui cadastro', HttpStatus.BAD_REQUEST);
  }

  return userResponse;
};
