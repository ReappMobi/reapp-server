import { Router } from 'express';

import { institution } from './institution.controller';
import { signUpValidation } from '@api/middlewares/institutionAuthValidation';

const router: Router = Router();

router.post(
  '/institution/signup',
  signUpValidation(),
  institution.institutionSignUp,
);

export default router;
