import express from "express";
import { signup, login } from "../controllers/auth.js";
import { signupSchema, loginSchema, validate } from "../middleware/validation.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
