import { Router } from 'express';

import { institution } from './institution.controller';
import {
  signUpValidation,
  signInValidation,
} from '@api/middlewares/institutionAuthValidation';

const router: Router = Router();

router.post(
  '/institution/signup',
  signUpValidation(),
  institution.institutionSignUp,
);

router.post(
  '/institution/signin',
  signInValidation(),
  institution.institutionSignIn,
);

export default router;
