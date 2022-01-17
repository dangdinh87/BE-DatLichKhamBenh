import express from 'express';
import { patientController } from '../controllers';

const router = express.Router();

router.get('/', patientController.getAll);
router.post('/', patientController.create);
router.get('/:id', patientController.getById);
router.delete('/:id', patientController.deletePatient);

module.exports = router;
