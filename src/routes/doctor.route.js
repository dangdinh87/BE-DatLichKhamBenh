import express from 'express';
import { doctorController } from '../controllers';
import { auth } from '../middleware/auth.middleware';
const router = express.Router();

router
  .route('/')
  .get(auth, doctorController.getAll)
  .post(doctorController.create);

router.route('/:id').get(doctorController.getById);

router.route('/').get(doctorController.getAll).post(doctorController.create);

module.exports = router;
