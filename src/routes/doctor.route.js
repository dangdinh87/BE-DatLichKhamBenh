import express from 'express';
import { doctorController } from '../controllers';
const { upload } = require('../middleware/upload.middleware');

import { verifyAccessToken } from '../services/token.service';

import { auth } from '../middleware/auth.middleware';
const router = express.Router();

// router
//   .route('/')
//   .get(auth, doctorController.getAll)
//   .post(doctorController.create);
router.put('/:id', upload, doctorController.update);
router.route('/:id').get(doctorController.getById);

router.route('/top/:n').get(doctorController.getTop);

router.route('/').get(doctorController.getAll).post(doctorController.create);

router.route('/update-status/:id');
module.exports = router;
