const express = require('express');
const router = express.Router();
const depoimentosController = require('../controllers/depoimentosController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', depoimentosController.listarDepoimentos);
router.get('/:id', depoimentosController.buscarDepoimentoPorId);
router.post('/', authMiddleware, depoimentosController.criarDepoimento);
router.put('/:id', authMiddleware, depoimentosController.atualizarDepoimento);
router.delete('/:id', authMiddleware, depoimentosController.excluirDepoimento);


module.exports = router;