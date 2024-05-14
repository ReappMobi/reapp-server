import { Router } from 'express';
import { login } from './auth.controller';

const router: Router = Router();

router.post('/auth', login);

export default router;
