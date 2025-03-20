const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.get('/', pacienteController.listarPaciente);
router.get('/:id', pacienteController.buscarPacientePorId);
router.post('/', pacienteController.criarPaciente);
router.put('/:id', pacienteController.atualizarPaciente);
router.delete('/:id', pacienteController.excluirPaciente);

module.exports = router;