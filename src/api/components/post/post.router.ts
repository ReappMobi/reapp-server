import { Router } from 'express';
import {
  postPublication,
  getAllPublications,
  getPublicationsByInstitution,
} from './post.controller';
import multer from 'multer';
const router: Router = Router();
import verifyToken from '@api/middlewares/verifyToken';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/post', verifyToken, upload.single('image'), postPublication);
router.get('/post', verifyToken, getAllPublications);
router.get('/post/:institutionId', verifyToken, getPublicationsByInstitution);

export default router;
