import express from 'express';
import { scheduleController } from '../controllers';
import { verifyAccessToken } from '../services/token.service';
import { auth } from '../middleware/auth.middleware';
const router = express.Router();

router.get('/', scheduleController.getAll);
router.get('/get-schedule-by-date', scheduleController.getOne);
router.get('/:id', scheduleController.getById);
router.post('/', scheduleController.create);
router.post('/:id', scheduleController.update);

// verifyAccessToken,

module.exports = router;
