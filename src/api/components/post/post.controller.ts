import { Request, Response, NextFunction } from 'express';
import {
  postPublicationService,
  getAllPublicationsService,
  getPublicationsByInstitutionService,
} from './post.service';
import HttpStatus from '@services/http-status';

interface ExtendedRequest extends Request {
  user?: { id: number };
}

export const postPublication = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { caption, institutionId } = request.body;
    const institutionIdNumber = parseInt(institutionId, 10);
    if (request.user?.id !== institutionIdNumber) {
      return response.status(403).json({ error: 'Acesso não autorizado' });
    }
    const file = request.file;
    const result = await postPublicationService({
      caption,
      file,
      institutionId: institutionIdNumber,
    });
    response.status(HttpStatus.CREATED);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export const getAllPublications = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const result = await getAllPublicationsService();
    response.status(HttpStatus.OK);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export const getPublicationsByInstitution = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const institutionId = parseInt(request.params.institutionId, 10);
    const result = await getPublicationsByInstitutionService(institutionId);
    response.status(HttpStatus.OK);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
