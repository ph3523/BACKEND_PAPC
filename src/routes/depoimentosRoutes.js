const express = require('express');
const router = express.Router();
const depoimentosController = require('../controllers/depoimentosController');
const authMiddleware = require('../middleware/authMiddleware'); //importa pra projeter as rotas

router.get('/', depoimentosController.listarDepoimentos);
router.get('/:id', depoimentosController.buscarDepoimentoPorId);

// criação de depoimento protegida por autenticação
router.post('/', authMiddleware, depoimentosController.criarDepoimento);

router.put('/:id', depoimentosController.atualizarDepoimento);
router.delete('/:id', depoimentosController.excluirDepoimento);

module.exports = router;