import express from 'express';
import { scheduleController } from '../controllers';
import { verifyAccessToken } from '../services/token.service';
import { auth } from '../middleware/auth.middleware';
const router = express.Router();

router.get('/get-schedule-by-date', scheduleController.getOne);

router
  .route('/')
  .get(scheduleController.getAll)
  .post(scheduleController.create);

router
  .route('/:id')
  .get(scheduleController.getById)
  .put(scheduleController.update);

// auth,

module.exports = router;
