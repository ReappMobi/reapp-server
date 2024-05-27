import { Router } from 'express';
import { payment } from './payment.controller';

const router: Router = Router();

router.post('/payment/request/institution', payment.requestPaymentInstitution);

export default router;
