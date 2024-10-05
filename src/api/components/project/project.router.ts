import { Router } from 'express';
import {
  postProject,
  toggleFavorite,
  getFavoriteProjects,
  getAllProjects,
  getProjectById,
  getProjectByInstitution,
  getProjectCategories,
} from './project.controller';
import multer from 'multer';
const router: Router = Router();
import verifyToken from '@api/middlewares/verifyToken';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/project', verifyToken, upload.single('image'), postProject);
router.post('/project/toggle-favorite', verifyToken, toggleFavorite);
router.get('/project', verifyToken, getAllProjects);
router.get('/project/favorite/:donorId', verifyToken, getFavoriteProjects);
router.get('/project/categories', verifyToken, getProjectCategories);
router.get('/project/:projectId', verifyToken, getProjectById);
router.get(
  '/project/institution/:institutionId',
  verifyToken,
  getProjectByInstitution,
);

export default router;
