import express from 'express';
import { positionController } from '../controllers';

const router = express.Router();

router.get('/', positionController.getAll);

module.exports = router;
