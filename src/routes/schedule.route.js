import express from 'express';
import { scheduleController } from '../controllers';

// import { verifyAccessToken } from '../services/token.service';

import { auth } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', scheduleController.getAll);
router.post('/', scheduleController.create);
router.get('/:id', scheduleController.getById);
router.post('/:id', scheduleController.update);
router.get('/wd-dt/check', auth, scheduleController.getOne);

module.exports = router;
