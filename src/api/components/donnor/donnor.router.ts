import { Router } from 'express';
import multer from 'multer';
import { donnor } from './donnor.controller';
import verifyToken from '@api/middlewares/verifyToken';
import { editInformationValidation } from '@api/middlewares/institutionAuthValidation';

const router: Router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/donnor', donnor.createDonnor);
router.post('/donnor/auth-google', donnor.createDonnorGoogle);
router.patch(
  '/donnor/editInformation',
  verifyToken,
  editInformationValidation(),
  upload.single('image'),
  donnor.editInformationDonor,
);

export default router;
