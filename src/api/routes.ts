import { Router } from 'express';

import healthcheck from '@components/healthcheck/healthcheck.router';

const router: Router = Router();

router.use(healthcheck);

export default router;
