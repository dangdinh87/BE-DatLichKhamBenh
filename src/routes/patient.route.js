import express from 'express';
import { patientController } from '../controllers';
const { upload } = require('../middleware/upload.middleware');
const router = express.Router();

router.route('/').get(patientController.getAll).post(patientController.create);

router
  .route('/:id')
  .get(patientController.getById)
  .put(upload, patientController.update)
  .delete(patientController.deletePatient);

module.exports = router;
