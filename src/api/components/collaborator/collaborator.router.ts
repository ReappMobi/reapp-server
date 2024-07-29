import { Router } from 'express';
import multer from 'multer';
const router: Router = Router();
import verifyToken from '@api/middlewares/verifyToken';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import {
  postCollaborator,
  getCollaboratorsByInstitutionId,
} from './collaborator.controller';

router.post(
  '/collaborator',
  verifyToken,
  upload.single('image'),
  postCollaborator,
);
router.get(
  '/collaborator/:institutionId',
  verifyToken,
  getCollaboratorsByInstitutionId,
);

export default router;
