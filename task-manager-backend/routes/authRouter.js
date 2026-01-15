import express from "express";
import { register, login, logout, refreshtoken } from "../controllers/authContollers.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refreshtoken", refreshtoken);
router.post("/logout", logout);

export default router;