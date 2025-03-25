const express = require('express');
const router = express.Router();
const grupoApoioController = require('../controllers/grupoApoioController');

router.get('/', grupoApoioController.listarGrupoApoio);
router.get('/:id', grupoApoioController.buscarGrupoApoioPorId);
router.post('/', grupoApoioController.criarGrupoApoio);
router.put('/:id', grupoApoioController.atualizarGrupoApoio);
router.delete('/:id', grupoApoioController.excluirGrupoApoio);

module.exports = router;