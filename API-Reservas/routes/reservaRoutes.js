import express from "express";
import {
  getRandomReserva,
  getReservaById,
  getReservaByType,
  getReservaByDate,
  createReserva,
  updateReserva,
  deleteReservaById,
} from "../controllers/reservaController.js";

const router = express.Router();

router.get("/random", getRandomReserva);
router.get("/:id", getReservaById);
router.get("/filter", getReservaByType);
router.get("/date/:date", getReservaByDate);
router.post("/", createReserva);
router.put("/:id", updateReserva);
router.delete("/:id", deleteReservaById);

export default router;
