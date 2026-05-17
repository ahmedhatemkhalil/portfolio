import { Router } from "express";
import rateLimit from "express-rate-limit";
import { body } from "express-validator";
import * as authController from "../controllers/authController.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { handleValidationErrors } from "../middleware/validate.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
});

const registerValidators = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 8, max: 128 })
    .withMessage("Password must be 8–128 characters"),
];

const loginValidators = [
  body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
  body("password").isString().notEmpty().withMessage("Password is required"),
];

router.post(
  "/register",
  authLimiter,
  registerValidators,
  handleValidationErrors,
  asyncHandler(authController.register),
);

router.post(
  "/login",
  authLimiter,
  loginValidators,
  handleValidationErrors,
  asyncHandler(authController.login),
);

router.post("/logout", requireAuth, asyncHandler(authController.logout));

router.get("/me", requireAuth, asyncHandler(authController.me));

export default router;
