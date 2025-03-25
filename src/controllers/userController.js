const Usuario = require('../models/userModel');
const Profissional = require('../models/profissionalModel');
const Paciente = require('../models/pacienteModel');

exports.criarUsuario = async (req, res) => {
  try {
    const { nome_usuario, email, senha, tipo, profissional, paciente } = req.body;

    if (!nome_usuario || !email || !senha || !tipo) {
      return res.status(400).json({ error: "Nome, email, senha e tipo são obrigatórios" });
    }

    if (tipo !== "PACIENTE" && tipo !== "PROFISSIONAL") {
      return res.status(400).json({ error: "Tipo de usuário inválido" });
    }

    const usuarioExistente = await Usuario.buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // taco no usuario Cria o usuário
    const novoUsuario = await Usuario.criarUsuario({
      nome_usuario,
      email,
      senha,
      tipo
    });

    // taco noor PROFISSIONAL, cria o profissional
    if (tipo === "PROFISSIONAL") {
      if (!profissional) {
        return res.status(400).json({ error: "Dados do profissional ausentes" });
      }

      await Profissional.criarProfissional({
        usuarioId: novoUsuario.id,
        nome_profissional: profissional.nome_profissional,
        crm: profissional.crm,
        especialidade: profissional.especialidade,
        localizacao: profissional.localizacao,
        faixa_etaria: profissional.faixa_etaria,
        atendimentos_gratuitos: profissional.atendimentos_gratuitos,
        foto_perfil: profissional.foto_perfil
      });
    }

    // Se for PACIENTE, cria o paciente
    if (tipo === "PACIENTE") {
      if (!paciente) {
        return res.status(400).json({ error: "Dados do paciente ausentes" });
      }

      await Paciente.criarPaciente({
        usuarioId: novoUsuario.id,
        nome_paciente: paciente.nome_paciente,
        data_nascimento: new Date(paciente.data_nascimento),
        endereco: paciente.endereco,
        genero: paciente.genero,
        telefone: paciente.telefone || null,
        queixas: paciente.queixas,
        historico_familiar: paciente.historico_familiar,
        uso_medicamentos: paciente.uso_medicamentos,
        objetivo_terapia: paciente.objetivo_terapia
      });
    }

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('ERRO AO CRIAR USUÁRIO:', error);
    res.status(500).json({ error: error.message || "Erro ao criar usuário" });
  }
};
exports.listarUsuario = async (req, res) => {
    try {
      const usuarios = await Usuario.listarUsuario();
      res.json(usuarios);
    } catch (error) {
      console.error('ERRO AO LISTAR USUÁRIOS:', error);
      res.status(500).json({ error: error.message || "Erro ao listar usuários" });
    }
  };
  
  exports.buscarUsuarioPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.buscarUsuarioPorId(Number(id));
      res.json(usuario);
    } catch (error) {
      console.error('ERRO AO BUSCAR USUÁRIO:', error);
      res.status(404).json({ error: error.message || "Usuário não encontrado" });
    }
  };
  
  exports.buscarUsuarioPorEmail = async (req, res) => {
    try {
      const { email } = req.params;
      const usuario = await Usuario.buscarUsuarioPorEmail(email);
      res.json(usuario);
    } catch (error) {
      console.error('ERRO AO BUSCAR USUÁRIO:', error);
      res.status(404).json({ error: error.message || "Usuário não encontrado" });
    }
  };
  
  exports.atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome_usuario, email, senha, tipo } = req.body;

        const usuarioAtualizado = await Usuario.atualizarUsuario(Number(id), {
            nome_usuario,
            email,
            senha,
            tipo
        });

        res.status(201).json(usuarioAtualizado);
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
        res.status(200).json({ 
            message: `Usuário ${id} excluído com sucesso`,
            success: true
        });
    } catch (error) {
      console.error('ERRO AO EXCLUIR USUÁRIO:', error);
      res.status(500).json({ error: error.message || "Erro ao excluir usuário" });
    }
  };