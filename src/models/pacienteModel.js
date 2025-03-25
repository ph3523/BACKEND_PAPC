const prisma = require('../prisma');
const { buscarUsuarioPorId } = require('./userModel');

const listarPaciente = async () => {
    return await prisma.paciente.findMany({
        include: { usuario: true }
    });
}

const buscarPacientePorId = async (id) => {
    const paciente = await prisma.paciente.findUnique({
        where: { id },
        include: { usuario: true }
    });

    if (!paciente) {
        throw new Error('Paciente não encontrado');
    }
    return paciente;
};

const criarPaciente = async (data) => {

    // verificação se o usuario existe
    const usuario = await buscarUsuarioPorId(data.usuarioId);

    // verificação se o usuario é um paciente
    if (usuario.tipo !== 'PACIENTE') {
        throw new Error('Usuário não é um paciente');
    }

    // verifica se já existe um paciente com o usuarioId
    const pacienteExistente = await prisma.paciente.findUnique({
        where: { usuarioId: data.usuarioId }
    });

    if (pacienteExistente) {
        throw new Error('Paciente já cadastrado');
    }

    return await prisma.paciente.create({
        data: {
            usuarioId: data.usuarioId,
            nome_paciente: data.nome_paciente,
            data_nascimento: data.data_nascimento,
            genero: data.genero,
            endereco: data.endereco,
            telefone: data.telefone,
            queixas: data.queixas,
            historico_familiar: data.historico_familiar,
            uso_medicamentos: data.uso_medicamentos,
            objetivo_terapia: data.objetivo_terapia
        },
    });
}

const atualizarPaciente = async (id, data) => {
    const paciente = await prisma.paciente.findUnique({
        where: { id },
    });

    if (!paciente) {
        throw new Error('Paciente não encontrado');
    }

    return await prisma.paciente.update({
        where: { id },
        data: {
            usuarioId: data.usuarioId,
            nome_paciente: data.nome_paciente,
            data_nascimento: data.data_nascimento,
            genero: data.genero,
            endereco: data.endereco,
            telefone: data.telefone,
            queixas: data.queixas,
            historico_familiar: data.historico_familiar,
            uso_medicamentos: data.uso_medicamentos,
            objetivo_terapia: data.objetivo_terapia
        },
    });
};

const excluirPaciente = async (id) => {
    const paciente = await prisma.paciente.findUnique({
        where: { id },
    });

    if (!paciente) {
        throw new Error('Paciente não encontrado');
    }

    return await prisma.paciente.delete({
        where: { id },
    });
}

module.exports = {
    listarPaciente,
    buscarPacientePorId,
    criarPaciente,
    atualizarPaciente,
    excluirPaciente
}