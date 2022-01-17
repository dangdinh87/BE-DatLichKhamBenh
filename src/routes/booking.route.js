import express from 'express';
import { bookingController } from '../controllers';

const router = express.Router();

// Xem lại bên cách làm route bên  NCC
router.route('/').post(bookingController.create);

router.route('/patient/:patientId').get(bookingController.getByPatientId);

router
  .route('/date-booking/:dateBooking')
  .get(bookingController.getByDateBooking);

module.exports = router;
