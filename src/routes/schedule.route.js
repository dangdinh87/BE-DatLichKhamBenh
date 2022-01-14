import express from "express";
import {
  scheduleController
} from "../controllers";
import {
  verifyAccessToken
} from "../services/token.service"
const router = express.Router();

router.get("/", scheduleController.getAll);
router.post("/", scheduleController.create);
router.get("/:id", scheduleController.getById);
router.post("/:id", scheduleController.update);
router.get("/wd-dt/check", verifyAccessToken, scheduleController.getOne);

module.exports = router;