import express from "express";
import { validateReserva } from '../validation/reservaValidation.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import {
  getAllReservas,
  getRandomReserva,
  getReservaById,
  getReservaByDate,
  createReserva,
  updateReserva,
  deleteReservaById,
} from "../controllers/reservaController.js";

const router = express.Router();

router.get("/", getAllReservas);
router.get("/random", getRandomReserva);
router.get("/:id", getReservaById);
router.get("/date/:date", getReservaByDate);
router.post("/", authenticateToken, validateReserva, createReserva);
router.put("/:id", authenticateToken, validateReserva, updateReserva);
router.delete("/:id",authenticateToken, deleteReservaById);

export default router;
