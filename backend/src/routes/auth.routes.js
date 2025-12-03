import express from "express";
import { login, register, updateUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update", updateUser);

export default router;
