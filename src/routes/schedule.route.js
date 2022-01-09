import express from "express";
import { scheduleController } from "../controllers";

const router = express.Router();

router.get("/", scheduleController.getAll);
router.post("/", scheduleController.create);
router.get("/:id", scheduleController.getById);
router.post("/:id", scheduleController.update);

module.exports = router;
