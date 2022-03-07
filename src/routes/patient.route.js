import express from 'express';
import { patientController } from '../controllers';
import { upload } from '../middleware/upload.middleware';

const router = express.Router();

router.route('/').get(patientController.getAll).post(patientController.create);

router
  .route('/:id')
  .put(upload, patientController.update)
  .get(patientController.getById)
  .delete(patientController.deletePatient);

module.exports = router;
