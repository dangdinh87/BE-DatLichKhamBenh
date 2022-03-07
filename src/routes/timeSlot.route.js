import express from "express";
import { timeSlotController } from "../controllers";

const router = express.Router();

router.get("/", timeSlotController.getAll);
router.post("/", timeSlotController.create);

module.exports = router;
