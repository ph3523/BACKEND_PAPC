const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', pacienteController.listarPaciente);

router.get('/:id', authMiddleware, pacienteController.buscarPacientePorId);
router.post('/', authMiddleware, pacienteController.criarPaciente);
router.put('/:id', authMiddleware, pacienteController.atualizarPaciente);
router.delete('/:id', authMiddleware, pacienteController.excluirPaciente);

module.exports = router;