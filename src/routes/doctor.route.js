import express from 'express';
import { doctorController } from '../controllers';

import { verifyAccessToken } from '../services/token.service';

const router = express.Router();

router.route('/').get(doctorController.getAll).post(doctorController.create);

router.route('/:id').get(doctorController.getById).put(doctorController.update);

module.exports = router;
