import express from 'express';
import { doctorController } from '../controllers';
const { upload } = require('../middleware/upload.middleware');

import { verifyAccessToken } from '../services/token.service';

const router = express.Router();

router.put('/:id', upload, doctorController.update);

router.route('/:id').get(doctorController.getById);

router.route('/').get(doctorController.getAll).post(doctorController.create);

module.exports = router;
