import { Router } from 'express';

import healthcheck from '@components/healthcheck/healthcheck.router';
import donnor from '@components/donnor/donnor.router';
import institution from '@components/institution/institution.router';

const router: Router = Router();

router.use(healthcheck);
router.use(donnor);
router.use(institution);

export default router;
