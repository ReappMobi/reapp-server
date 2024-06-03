import { Router } from 'express';
import { payment } from './payment.controller';

const router: Router = Router();

router.post('/payment/request', payment.requestPaymentInstitution);
router.post('/payment/callback', payment.paymentCallback);

export default router;
