const Paciente = require('../models/pacienteModel');

exports.listarPaciente = async (req, res) => {
    try {
        const pacientes = await Paciente.listarPaciente();
        res.json(pacientes);
    }
    catch (error) {
        console.error('ERRO AO LISTAR PACIENTES:', error);
        res.status(500).json({ error: error.message || "Erro ao listar pacientes" });
    }
};

exports.buscarPacientePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const paciente = await Paciente.buscarPacientePorId(Number(id));
        res.json(paciente);
    }
    catch (error) {
        console.error('ERRO AO BUSCAR PACIENTE:', error);
        res.status(404).json({ error: error.message || "Paciente não encontrado" });
    }
};

exports.criarPaciente = async (req, res) => {
    try {
        const { usuarioId, nome_paciente, data_nascimento, genero, endereco, telefone, queixas, historico_familiar, uso_medicamentos, objetivo_terapia } = req.body;

        if (!usuarioId || !nome_paciente || !data_nascimento || !genero || !endereco || !queixas || !historico_familiar || !uso_medicamentos || !objetivo_terapia) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const dataFormatada = new Date(data_nascimento);

        const novoPaciente = await Paciente.criarPaciente({
            usuarioId,
            nome_paciente,
            data_nascimento: dataFormatada,
            genero,
            endereco,
            telefone,
            queixas,
            historico_familiar,
            uso_medicamentos,
            objetivo_terapia
        });
        res.status(201).json(novoPaciente);
    }
    catch (error) {
        console.error('ERRO AO CRIAR PACIENTE:', error);
        res.status(500).json({ error: error.message || "Erro ao criar paciente" });
    }
};

exports.atualizarPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_paciente, data_nascimento, genero, endereco, telefone, queixas, historico_familiar, uso_medicamentos, objetivo_terapia } = req.body;

        const pacienteAtualizado = await Paciente.atualizarPaciente(Number(id), {
            nome_paciente,
            data_nascimento,
            genero,
            endereco,
            telefone,
            queixas,
            historico_familiar,
            uso_medicamentos,
            objetivo_terapia
        });

        res.status(200).json(pacienteAtualizado);
    }
    catch (error) {
        console.error('ERRO AO ATUALIZAR PACIENTE:', error);
        res.status(500).json({ error: error.message || "Erro ao atualizar paciente" });
    }
};

exports.excluirPaciente = async (req, res) => {
    try {
        const { id } = req.params;
        await Paciente.excluirPaciente(Number(id));
        res.status(204).json({ message: "Paciente excluído com sucesso" });
    }
    catch (error) {
        console.error('ERRO AO EXCLUIR PACIENTE:', error);
        res.status(500).json({ error: error.message || "Erro ao excluir paciente" });
    }
}