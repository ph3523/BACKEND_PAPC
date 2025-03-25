const express = require('express');
const router = express.Router();
const depoimentosController = require('../controllers/depoimentosController');

router.get('/', depoimentosController.listarDepoimentos);
router.get('/:id', depoimentosController.buscarDepoimentoPorId);
router.post('/', depoimentosController.criarDepoimento);
router.put('/:id', depoimentosController.atualizarDepoimento);
router.delete('/:id', depoimentosController.excluirDepoimento);

module.exports = router;