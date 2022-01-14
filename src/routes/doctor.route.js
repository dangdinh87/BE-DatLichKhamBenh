import express from "express";
import {
  doctorController
} from "../controllers";

const router = express.Router();

router.get("/", doctorController.getAll);
router.post("/", doctorController.create);
module.exports = router;