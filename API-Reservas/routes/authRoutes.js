import express from "express";
import { register, login, createAdmin, deleteUser, updateUser } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin/create", authenticateToken, createAdmin);
router.delete("/admin/delete/:id", authenticateToken, deleteUser);
router.put("/user/update", authenticateToken, updateUser);

export default router;
