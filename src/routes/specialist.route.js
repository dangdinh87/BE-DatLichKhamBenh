import express from 'express';
import { specialistController } from '../controllers';

const router = express.Router();

router.get('/', specialistController.getAll);

module.exports = router;
