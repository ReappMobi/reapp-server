import { Router } from 'express';
import multer from 'multer';
import { institution } from './institution.controller';
import {
  signUpValidation,
  editInformationValidation,
} from '@api/middlewares/institutionAuthValidation';
import verifyToken from '@api/middlewares/verifyToken';

const router: Router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  '/institution/signup',
  signUpValidation(),
  institution.institutionSignUp,
);

router.patch(
  '/institution/editInformation',
  verifyToken,
  editInformationValidation(),
  upload.single('image'),
  institution.editInformation,
);

router.get('/institution', verifyToken, institution.getAllInstitution);

router.get('/institution/:id', verifyToken, institution.getInstitutionByid);

export default router;
