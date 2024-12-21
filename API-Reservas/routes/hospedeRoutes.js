import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { getAllHospedes, getHospedeById, createHospede, updateHospede, deleteHospede } from '../controllers/hospedeController.js';
import { validateHospede } from '../validation/hospedeValidation.js';

const router = express.Router();

router.get('/', authenticateToken, getAllHospedes);
router.get('/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const hospede = getHospedeById(id);
  if (!hospede) return res.status(404).json({ message: 'Hóspede não encontrado' });
  res.json(hospede);
});
router.post('/', validateHospede, createHospede); // Rota de criação de hóspedes sem autenticação
router.put('/:id', authenticateToken, validateHospede, updateHospede);
router.delete('/:id', authenticateToken, deleteHospede);

export default router;
