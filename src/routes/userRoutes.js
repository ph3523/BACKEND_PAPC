const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.listarUsuario);
router.get('/:id', userController.buscarUsuarioPorId);
router.get('/email/:email', userController.buscarUsuarioPorEmail);
router.post('/', userController.criarUsuario);
router.put('/:id', userController.atualizarUsuario);
router.delete('/:id', userController.excluirUsuario);

module.exports = router;