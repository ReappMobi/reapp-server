import { Router } from 'express';

import healthcheck from '@components/healthcheck/healthcheck.router';
import donnor from '@components/donnor/donnor.router';

const router: Router = Router();

router.use(healthcheck);
router.use(donnor);

export default router;
