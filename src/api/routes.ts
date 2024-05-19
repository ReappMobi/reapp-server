import { Router } from 'express';

import healthcheck from '@components/healthcheck/healthcheck.router';
import donnor from '@components/donnor/donnor.router';
import institution from '@components/institution/institution.router';
import auth from '@components/auth/auth.router';

const router: Router = Router();

router.use(healthcheck);
router.use(donnor);
router.use(institution);
router.use(auth);

export default router;
