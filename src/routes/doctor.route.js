import express from 'express';
import { doctorController } from '../controllers';

import { verifyAccessToken } from '../services/token.service';

const router = express.Router();

router.get('/', doctorController.getAll);
router.get('/:id', doctorController.getById);
router.post('/', doctorController.create);
module.exports = router;
