const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalController');

router.get('/', profissionalController.listarProfissional);
router.get('/:id', profissionalController.buscarProfissionalPorId);
router.post('/', profissionalController.criarProfissional);
router.put('/:id', profissionalController.atualizarProfissional);
router.delete('/:id', profissionalController.excluirProfissional);

module.exports = router;