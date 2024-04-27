import { Router } from 'express';

import { donnor } from './donnor.controller';

const router: Router = Router();

router.post('/donnor', donnor.createDonnor);

export default router;
