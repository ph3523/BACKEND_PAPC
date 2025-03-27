const express = require('express');
const router = express.Router();
const profissionalController = require('../controllers/profissionalController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', profissionalController.listarProfissional);
router.get('/:id', profissionalController.buscarProfissionalPorId);

router.post('/', authMiddleware, profissionalController.criarProfissional);
router.put('/:id', authMiddleware, profissionalController.atualizarProfissional);
router.delete('/:id', authMiddleware, profissionalController.excluirProfissional);

module.exports = router;