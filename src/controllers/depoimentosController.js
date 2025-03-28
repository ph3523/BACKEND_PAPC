const Depoimento = require('../models/depoimentosModel');

exports.listarDepoimentos = async (req, res) => {
    
    try {
        const depoimentos = await Depoimento.listarDepoimentos();
        res.json(depoimentos);
    }
    catch (error) {
        console.error('ERRO AO LISTAR DEPOIMENTOS:', error);
        res.status(500).json({ error: error.message || "Erro ao listar depoimentos" });
    }
};

exports.buscarDepoimentoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const depoimento = await Depoimento.buscarDepoimentoPorId(Number(id));
        res.json(depoimento);
    }
    catch (error) {
        console.error('ERRO AO BUSCAR DEPOIMENTO:', error);
        res.status(404).json({ error: error.message || "Depoimento não encontrado" });
    }
};

const prisma = require('../prisma'); // necessário para checar o bixo

exports.criarDepoimento = async (req, res) => {
  try {
    const usuarioId = req.user.id; // ID do usuário autenticado, porque antes tava vindo do body e dando b.o na autencicação
    const { texto } = req.body;

    if (!texto) {
      return res.status(400).json({ error: "Texto é obrigatório" });
    }

    //verifica se é um paciente registrado
    const paciente = await prisma.paciente.findUnique({
      where: { usuarioId }
    });

    if (!paciente) {
      return res.status(403).json({ error: "Apenas pacientes podem enviar depoimentos" });
    }

    const novoDepoimento = await prisma.depoimento.create({
      data: {
        pacienteId: paciente.id,
        texto
      }
    });

    res.status(201).json(novoDepoimento);
  } catch (error) {
    console.error('ERRO AO CRIAR DEPOIMENTO:', error);
    res.status(500).json({ error: error.message || "Erro ao criar depoimento" });
  }
};
exports.atualizarDepoimento = async (req, res) => {
    try {
        const { id } = req.params;
        const { texto } = req.body;

        if (!texto) {
            return res.status(400).json({ error: "Texto é obrigatório" });
        }

        const depoimentoAtualizado = await Depoimento.atualizarDepoimento(Number(id), {
            texto
        });

        res.status(201).json(depoimentoAtualizado);
    }
    catch (error) {
        console.error('ERRO AO ATUALIZAR DEPOIMENTO:', error);
        res.status(500).json({ error: error.message || "Erro ao atualizar depoimento" });
    }
};

exports.excluirDepoimento = async (req, res) => {
    try {
        const { id } = req.params;
        await Depoimento.excluirDepoimento(Number(id));
        res.status(200).json({ 
            message: `Depoimento ${id} excluído com sucesso`,
            success: true
        });
    }
    catch (error) {
        console.error('ERRO AO EXCLUIR DEPOIMENTO:', error);
        res.status(500).json({ error: error.message || "Erro ao excluir depoimento" });
    }
};