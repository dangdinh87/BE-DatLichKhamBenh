import express from 'express';
import { doctorController } from '../controllers';
<<<<<<< HEAD
import { auth } from '../middleware/auth.middleware';
const router = express.Router();

router
  .route('/')
  .get(auth, doctorController.getAll)
  .post(doctorController.create);
=======
const { upload } = require('../middleware/upload.middleware');

import { verifyAccessToken } from '../services/token.service';

const router = express.Router();

router.put('/:id', upload, doctorController.update);
>>>>>>> b3ca96d27af29b085466559ea9cad2174da5620b

router.route('/:id').get(doctorController.getById);

router.route('/').get(doctorController.getAll).post(doctorController.create);

module.exports = router;
