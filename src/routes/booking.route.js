import express from 'express';
import { bookingController } from '../controllers';

const router = express.Router();

// Xem lại bên cách làm route bên  NCC
router.route('/').post(bookingController.create);

router.route('/patient/:patientId').get(bookingController.getByPatientId);

router
  .route('/date-booking/:dateBooking')
  .get(bookingController.getByDateBooking);

router.route('/doctor/:id').get(bookingController.getByDoctorId);

router.route('/verify-booking').post(bookingController.verifyBooking);

router
  .route('/count-booking/:doctorId')
  .get(bookingController.countBookingByDoctorId);

module.exports = router;
