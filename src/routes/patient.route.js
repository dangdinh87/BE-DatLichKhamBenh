// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
import express from 'express';
import { patientController } from '../controllers';

const router = express.Router();

router.get('/', patientController.getUsers);
router.post('/create', patientController.createUser);

module.exports = router;
