// const auth = require('../../middlewares/auth');
// const validate = require('../../middlewares/validate');
// const userValidation = require('../../validations/user.validation');
import express from "express";
import { patientController } from "../controllers";

const router = express.Router();

router.get("/", patientController.getAllPatients);
router.post("/", patientController.createPatient);
router.delete("/:id", patientController.deletePatient);

module.exports = router;
