const Usuario = require('../models/userModel');

exports.listarUsuario = async (req, res) => {

    try {
        const usuarios = await Usuario.listarUsuario();
        res.json(usuarios);
    }
    catch (error) {
        console.error('ERRO AO LISTAR USUÁRIOS:', error);
        res.status(500).json({ error: error.message || "Erro ao listar usuários" });
    }
};

exports.buscarUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.buscarUsuarioPorId(Number(id));
        res.json(usuario);
    }
    catch (error) {
        console.error('ERRO AO BUSCAR USUÁRIO:', error);
        res.status(404).json({ error: error.message || "Usuário não encontrado" });
    }
};

exports.buscarUsuarioPorEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const usuario = await Usuario;
        res.json(usuario);
    }
    catch (error) {
        console.error('ERRO AO BUSCAR USUÁRIO:', error);
        res.status(404).json({ error: error.message || "Usuário não encontrado" });
    }
};

exports.criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, tipo } = req.body;

        if (!nome || !email || !senha || !tipo) {
            return res.status(400).json({ error: "Nome, email, senha e tipo são obrigatórios" });
        }

        if (tipo !== 'PACIENTE' && tipo !== 'PROFISSIONAL') {
            return res.status(400).json({ error: "Tipo de usuário inválido" });
        }

        const usuarioExistente = await Usuario.buscarUsuarioPorEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ error: "Email já cadastrado" });
        }

        const novoUsuario = await Usuario.criarUsuario({
            nome,
            email,
            senha,
            tipo
        });
        res.status(201).json(novoUsuario);
    }
    catch (error) {
        console.error('ERRO AO CRIAR USUÁRIO:', error);
        res.status(500).json({ error: error.message || "Erro ao criar usuário" });
    }
};

exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha, tipo } = req.body;

        if (!nome || !email || !senha || !tipo) {
            return res.status(400).json({ error: "Nome, email, senha e tipo são obrigatórios" });
        }

        const usuarioAtualizado = await Usuario.atualizarUsuario(Number(id), {
            nome,
            email,
            senha,
            tipo
        });

        res.json(usuarioAtualizado);
    }
    catch (error) {
        console.error('ERRO AO ATUALIZAR USUÁRIO:', error);
        res.status(500).json({ error: error.message || "Erro ao atualizar usuário" });
    }
};

exports.excluirUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        await Usuario.excluirUsuario(Number(id));
        res.status(204).send();
    } catch (error) {
        console.error('ERRO AO EXCLUIR USUÁRIO:', error);
        res.status(500).json({ error: error.message || "Erro ao excluir usuário" });
    }
};