import express from "express";
import { authController } from "../controllers";
import { verifyAccessToken } from "../services/token.service"

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", verifyAccessToken, authController.logout);
// router.post("/reset-password", authController.resetPassword);

module.exports = router;
