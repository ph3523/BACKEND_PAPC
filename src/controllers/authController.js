const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log("Dados Recebidos: ", req.body);

    try {
        const {nome_usuario, email, senha, tipo} = req.body;

        if (!nome_usuario || !email || !senha || !tipo) {
            return res.status(400).send({error: 'Faltam Campos a serem preenchidos!'});
        }

        const usuarioExistente = await userModel.buscarUsuarioPorEmail(email);
        if (usuarioExistente){
            return res.status(400).send({error: 'Email já cadastrado!'});
        }

        await userModel.criarUsuario({nome_usuario, email, senha, tipo});
        res.status(201).json({message: 'Usuário cadastrado com sucesso!'});
    }
    catch (error) {
        res.status(500).json({error: "Erro ao registrar usuário!"});
    }
};

const login = async (req, res) => {
    try {
        const {email, senha} = req.body;

        const usuario = await userModel.buscarUsuarioPorEmail(email);
        if (!usuario) {
            return res.status(400).send({error: 'Usuário não encontrado!'});
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).send({error: 'Senha inválida!'});
        }

        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({token});
    }
    catch (error) {
        res.status(500).json({error: "Erro ao fazer login!"});
    }
};

module.exports = {
    register, 
    login
};