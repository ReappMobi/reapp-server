import { Request, Response, NextFunction } from 'express';
import {
  postProjectService,
  getAllProjectsService,
  getProjectByIdService,
  getProjectsByInstitutionService,
  getProjectCategoriesService,
  toggleFavoriteService,
  getFavoriteProjectService,
} from './project.service';
import HttpStatus from '@services/http-status';

interface ExtendedRequest extends Request {
  user?: { id: number };
}

export const postProject = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { description, name, institutionId, categoryId, subtitle } =
      request.body;
    const institutionIdNumber = parseInt(institutionId, 10);
    const categoryIdNumber = parseInt(categoryId, 10);
    if (request.user?.id !== institutionIdNumber) {
      return response.status(403).json({ error: 'Acesso não autorizado' });
    }
    const file = request.file;
    const result = await postProjectService({
      description,
      name,
      file,
      subtitle,
      categoryId: categoryIdNumber,
      institutionId: institutionIdNumber,
    });
    response.status(HttpStatus.CREATED);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export const toggleFavorite = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const { donorId, projectId } = request.body;
    const result = await toggleFavoriteService({ donorId, projectId });
    response.status(HttpStatus.OK);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    if (request.user) {
      const isDonor = request.query.isDonor === 'true';
      const result = await getAllProjectsService(isDonor, request.user.id);
      response.status(HttpStatus.OK);
      response.send(result);
    } else {
      response.status(HttpStatus.BAD_REQUEST);
      response.send();
    }
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const projectId = parseInt(request.params.projectId, 10);
    const result = await getProjectByIdService(projectId);
    response.status(HttpStatus.OK);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export const getFavoriteProjects = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const donorId = parseInt(request.params.donorId, 10);
    const result = await getFavoriteProjectService(donorId);
    response.status(HttpStatus.OK);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export const getProjectByInstitution = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const institutionId = parseInt(request.params.institutionId, 10);
    const result = await getProjectsByInstitutionService(institutionId);
    response.status(HttpStatus.OK);
    response.send(result);
  } catch (error) {
    next(error);
  }
};

export const getProjectCategories = async (
  request: ExtendedRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const result = await getProjectCategoriesService();
    response.status(HttpStatus.OK);
    response.send(result);
  } catch (error) {
    next(error);
  }
};
