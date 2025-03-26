const userModel = require('../models/userModel');
const Paciente = require('../models/pacienteModel');
const Profissional = require('../models/profissionalModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log("Dados Recebidos: ", req.body);

    try {
        const {nome_usuario, email, senha, tipo, paciente, profissional} = req.body;

        if (!nome_usuario || !email || !senha || !tipo) {
            return res.status(400).send({error: 'Faltam Campos a serem preenchidos!'});
        }

        const usuarioExistente = await userModel.buscarUsuarioPorEmail(email);
        if (usuarioExistente){
            return res.status(400).send({error: 'Email já cadastrado!'});
        }

        const novoUsuario = await userModel.criarUsuario({nome_usuario, email, senha, tipo});

        if (tipo === 'PACIENTE' && paciente) {
            await Paciente.criarPaciente({
                usuarioId: novoUsuario.id,
                ...paciente
            });
        }

        if (tipo === 'PROFISSIONAL' && profissional) {
            await Profissional.criarProfissional({
                usuarioId: novoUsuario.id,
                ...profissional
            });
        }

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso!',
            id: novoUsuario.id
        });
    }
    catch (error) {
        rconsole.error("ERRO AO REGISTRAR:", error);
        res.status(500).json({error: error.message || "Erro ao registrar usuário!"});
    }
};

const login = async (req, res) => {
    try {
        const {email, senha} = req.body;
        console.log("Tentando login com email:", email);


        const usuario = await userModel.buscarUsuarioPorEmail(email);
        console.log("Resultado da busca:", usuario);
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