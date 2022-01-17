import express from 'express';
import { doctorController } from '../controllers';

const router = express.Router();

router.get('/', doctorController.getAll);
router.post('/', doctorController.create);
router.get('/:id', doctorController.getById);

module.exports = router;
