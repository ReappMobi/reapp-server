import { Router } from 'express';
import multer from 'multer';
const router: Router = Router();
import verifyToken from '@api/middlewares/verifyToken';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import {
  postVolunteer,
  getVolunteersByInstitutionId,
} from './volunteer.controller';

router.post('/volunteer', verifyToken, upload.single('image'), postVolunteer);
router.get(
  '/volunteer/:institutionId',
  verifyToken,
  getVolunteersByInstitutionId,
);

export default router;
