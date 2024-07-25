import { Router } from 'express';

import healthcheck from '@components/healthcheck/healthcheck.router';
import donnor from '@components/donnor/donnor.router';
import institution from '@components/institution/institution.router';
import auth from '@components/auth/auth.router';
import payment from '@components/payment/payment.router';
import post from '@components/post/post.router';

const router: Router = Router();

router.use(healthcheck);
router.use(donnor);
router.use(institution);
router.use(auth);
router.use(payment);
router.use(post);

export default router;
