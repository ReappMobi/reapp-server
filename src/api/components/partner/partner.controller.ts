import { Request, Response, NextFunction } from 'express';
import HttpStatus from '@services/http-status';

interface ExtendedRequest extends Request {
  user?: { id: number };
}

import {
  postPartnerService,
  getPartnersByInstitutionIdService,
} from './partner.service';

export const postPartner = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { name, institutionId } = request.body;
    const institutionIdNumber = parseInt(institutionId, 10);
    if (request.user?.id !== institutionIdNumber) {
      return response.status(403).json({ error: 'Acesso não autorizado' });
    }
    const file = request.file;
    const result = await postPartnerService({
      name,
      institutionId: institutionIdNumber,
      file,
    });
    response.status(HttpStatus.CREATED);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export const getPartnersByInstitutionId = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const institutionId = parseInt(request.params.institutionId, 10);
    const result = await getPartnersByInstitutionIdService(institutionId);
    response.status(HttpStatus.OK);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
