const prisma = require('../prisma');
const { buscarUsuarioPorId } = require('./userModel');

const listarPaciente = async () => {
    return await prisma.paciente.findMany({
        include: { usuario: true }
    });
}

const buscarPacientePorId = async (id) => {
    const paciente = await prisma.paciente.findUnique({
        where: {id},
        include: { usuario: true }
    });

    if (!paciente) {
        throw new Error('Paciente não encontrado');
    }
    return paciente;
};

const criarPaciente = async ({usuarioId, nome_paciente,data_nascimento, genero, endereco, telefone, queixas, historico_familiar, uso_medicamentos, objetivo_terapia}) => {
    
    //  se o usuario existe
    const usuario = await buscarUsuarioPorId(usuarioId);

    //  se o usuario é um paciente
    if (usuario.tipo !== 'PACIENTE') {
        throw new Error('Usuário não é um paciente');
    }

    // se já existe um paciente com o usuarioId
    const pacienteExistente = await prisma.paciente.findUnique({
        where: {usuarioId}
    });

    if (pacienteExistente) {
        throw new Error('Paciente já cadastrado');
    }

    return await prisma.paciente.create({
        data: {
            usuarioId,
            nome_paciente,
            data_nascimento: new Date (data_nascimento),
            genero,
            endereco,
            telefone,
            queixas,
            historico_familiar,
            uso_medicamentos,
            objetivo_terapia
        },
    });
}

const atualizarPaciente = async (id, { nome_paciente,data_nascimento, genero, endereco, telefone, queixas, historico_familiar, uso_medicamentos, objetivo_terapia}) => {
    const paciente = await prisma.paciente.findUnique({
        where: {id},
    });

    if (!paciente) {
        throw new Error('Paciente não encontrado');
    }

    return await prisma.paciente.update({
        where: {id},
        data: {
            nome_paciente,
            data_nascimento,
            genero,
            endereco,
            telefone,
            queixas,
            historico_familiar,
            uso_medicamentos,
            objetivo_terapia
        },
    });
};

const excluirPaciente = async (id) => {
    const paciente = await prisma.paciente.findUnique({
        where: {id},
    });

    if (!paciente) {
        throw new Error('Paciente não encontrado');
    }

    return await prisma.paciente.delete({
        where: {id},
    });
}

module.exports = {
    listarPaciente,
    buscarPacientePorId,
    criarPaciente,
    atualizarPaciente,
    excluirPaciente
}