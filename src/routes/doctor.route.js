import express from 'express';
import { doctorController } from '../controllers';
const { upload } = require('../middleware/upload.middleware');

import { verifyAccessToken } from '../services/token.service';

import { auth } from '../middleware/auth.middleware';
const router = express.Router();

router
  .route('/doctor-admin')
  .get(doctorController.getAllFromAdmin)
router.route('/top-doctor').get(doctorController.getTop);
router.get('/new-clinic', doctorController.getNewClinic);
router.put('/:id', upload, doctorController.update);
router.route('/:id').get(doctorController.getById);
router.route('/').get(doctorController.getAll).post(doctorController.create);
router.route('/update-status/:id');
module.exports = router;
