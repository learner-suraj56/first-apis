import express from "express";
import { getUsers, createUser, getUser, updateUser, deleteUser } from "../controllers/users.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

// Public
router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);

// Protected
router.patch("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

export default router;
