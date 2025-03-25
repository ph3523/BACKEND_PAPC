const GrupoApoio = require('../models/grupoApoioModel');

exports.listarGrupoApoio = async (req, res) => {
    
    try {
        const grupos = await GrupoApoio.listarGrupoApoio();
        res.json(grupos);
    }
    catch (error) {
        console.error('ERRO AO LISTAR GRUPOS DE APOIO:', error);
        res.status(500).json({ error: error.message || "Erro ao listar grupos de apoio" });
    }
};

exports.buscarGrupoApoioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const grupo = await GrupoApoio.buscarGrupoApoioPorId(Number(id));
        res.json(grupo);
    }
    catch (error) {
        console.error('ERRO AO BUSCAR GRUPO DE APOIO:', error);
        res.status(404).json({ error: error.message || "Grupo de apoio não encontrado" });
    }
};

exports.criarGrupoApoio = async (req, res) => {
    try {
        const { nome, descricao, local, horario } = req.body;

        if (!nome || !descricao || !local || !horario || !data.publico_alvo 
            || !data.tipo_atendimento || !data.gratuito || !data.valor) {
            return res.status(400).json({ error: "Nome, descrição, local e horário são obrigatórios" });
        }

        const novoGrupo = await GrupoApoio.criarGrupoApoio({
            nome,
            descricao,
            local,
            horario,
            publico_alvo,
            tipo_atendimento,
            gratuito,
            valor
        });

        res.status(201).json(novoGrupo);
    }
    catch (error) {
        console.error('ERRO AO CRIAR GRUPO DE APOIO:', error);
        res.status(500).json({ error: error.message || "Erro ao criar grupo de apoio" });
    }
};

exports.atualizarGrupoApoio = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, local, horario } = req.body;

        const grupoAtualizado = await GrupoApoio.atualizarGrupoApoio(Number(id), {
            nome,
            descricao,
            local,
            horario,
            publico_alvo,
            tipo_atendimento,
            gratuito,
            valor
        });

        res.status(201).json(grupoAtualizado);
    }
    catch (error) {
        console.error('ERRO AO ATUALIZAR GRUPO DE APOIO:', error);
        res.status(500).json({ error: error.message || "Erro ao atualizar grupo de apoio" });
    }
};

exports.excluirGrupoApoio = async (req, res) => {
    try {
        const { id } = req.params;
        await GrupoApoio.excluirGrupoApoio(Number(id));
        res.status(200).json({ 
            message: `Grupo de Apoio ${id} excluído com sucesso`,
            success: true
        });
    }
    catch (error) {
        console.error('ERRO AO EXCLUIR GRUPO DE APOIO:', error);
        res.status(500).json({ error: error.message || "Erro ao excluir grupo de apoio" }); 
    }
}