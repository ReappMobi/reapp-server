import { Router } from 'express';

import healthcheck from '@components/healthcheck/healthcheck.router';
import donnor from '@components/donnor/donnor.router';
import institution from '@components/institution/institution.router';
import auth from '@components/auth/auth.router';
import payment from '@components/payment/payment.router';
import post from '@components/post/post.router';
import project from '@components/project/project.router';
import partner from '@components/partner/partner.router';
import collaborator from '@components/collaborator/collaborator.router';
import volunteer from '@components/volunteer/volunteer.router';

const router: Router = Router();

router.use(healthcheck);
router.use(donnor);
router.use(institution);
router.use(auth);
router.use(payment);
router.use(post);
router.use(project);
router.use(partner);
router.use(collaborator);
router.use(volunteer);

export default router;
