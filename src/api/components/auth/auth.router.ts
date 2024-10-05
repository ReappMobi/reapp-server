import { Router } from 'express';
import { login, loginGoogle } from './auth.controller';

const router: Router = Router();

router.post('/auth', login);
router.post('/auth/google-auth', loginGoogle);

export default router;
