const Profissional = require('../models/profissionalModel');

exports.listarProfissional = async (req, res) => {
    try {
        const profissionais = await Profissional.listarProfissional();
        res.json(profissionais);
    }
    catch (error) {
        console.error('ERRO AO LISTAR PROFISSIONAIS:', error);
        res.status(500).json({ error: error.message || "Erro ao listar profissionais" });
    }
};

exports.buscarProfissionalPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const profissional = await Profissional.buscarProfissionalPorId(Number(id));
        res.json(profissional);
    }
    catch (error) {
        console.error('ERRO AO BUSCAR PROFISSIONAL:', error);
        res.status(404).json({ error: error.message || "Profissional não encontrado" });
    }
};

exports.criarProfissional = async (req, res) => {
    try {
        const { usuarioId, nome_profissional, crm, especialidade, localizacao, faixa_etaria, atendimentos_gratuitos, foto_perfil } = req.body;

        if (!usuarioId || !nome_profissional || !crm || !especialidade || !localizacao || !faixa_etaria || !atendimentos_gratuitos) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const novoProfissional = await Profissional.criarProfissional({
            usuarioId,
            nome_profissional,
            crm,
            especialidade,
            localizacao,
            faixa_etaria,
            atendimentos_gratuitos,
            foto_perfil
        });
        res.status(201).json(novoProfissional);
    }
    catch (error) {
        console.error('ERRO AO CRIAR PROFISSIONAL:', error);
        res.status(500).json({ error: error.message || "Erro ao criar profissional" });
    }
};

exports.atualizarProfissional = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_profissional, crm, especialidade, localizacao, faixa_etaria, atendimentos_gratuitos, foto_perfil } = req.body;

        const profissionalAtualizado = await Profissional.atualizarProfissional(Number(id), {
            nome_profissional,
            crm,
            especialidade,
            localizacao,
            faixa_etaria,
            atendimentos_gratuitos,
            foto_perfil
        });
        res.status(200).json(profissionalAtualizado);
    }
    catch (error) {
        console.error('ERRO AO ATUALIZAR PROFISSIONAL:', error);
        res.status(500).json({ error: error.message || "Erro ao atualizar profissional" });
    }
};

exports.excluirProfissional = async (req, res) => {
    try {
        const { id } = req.params;
        await Profissional.excluirProfissional(Number(id));
        res.status(200).json({ 
            message: `Profissional ${id} excluído com sucesso`,
            success: true
        });
    }
    catch (error) {
        console.error('ERRO AO EXCLUIR PROFISSIONAL:', error);
        res.status(500).json({ error: error.message || "Erro ao excluir profissional" });
    }
}