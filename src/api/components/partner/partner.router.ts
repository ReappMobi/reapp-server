import { Router } from 'express';
import multer from 'multer';
const router: Router = Router();
import verifyToken from '@api/middlewares/verifyToken';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { postPartner, getPartnersByInstitutionId } from './partner.controller';

router.post('/partner', verifyToken, upload.single('image'), postPartner);
router.get('/partner/:institutionId', verifyToken, getPartnersByInstitutionId);

export default router;
