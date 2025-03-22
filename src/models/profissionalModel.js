const { buscarUsuarioPorId } = require('./userModel');
const prisma = require('../prisma');

const listarProfissional = async () => {
    return await prisma.profissional.findMany({
        include: { usuario: true }
    });
}

const buscarProfissionalPorId = async (id) => {
    const profissional = await prisma.profissional.findUnique({
        where: {id},
        include: { usuario: true }
    });

    if (!profissional) {
        throw new Error('Profissional não encontrado');
    }
    return profissional;
};

const criarProfissional = async ({usuarioId, nome_profissional, crm, especialidade, localizacao, faixa_etaria, atendimentos_gratuitos, foto_perfil}) => {
    
    // verificação se o usuario existe
    const usuario = await buscarUsuarioPorId(usuarioId);

     // verificação se o usuario é um profissional
    if (usuario.tipo !== 'PROFISSIONAL') {
        throw new Error('Usuário não é um profissional');
    }

    // verifica se já existe um profissional com o usuarioId
    const profissionalExistente = await prisma.profissional.findUnique({
        where: {usuarioId}
    });

    if (profissionalExistente) {
        throw new Error('Profissional já cadastrado');
    }
    return await prisma.profissional.create({
        data: {
            usuarioId,
            nome_profissional,
            crm,
            especialidade,
            localizacao,
            faixa_etaria,
            atendimentos_gratuitos,
            foto_perfil
        },
    });

};

const atualizarProfissional = async (id, { nome_profissional, crm, especialidade, localizacao, faixa_etaria, atendimentos_gratuitos, foto_perfil}) => {
    const profissional = await prisma.profissional.findUnique({
        where: {id},
    });

    if (!profissional) {
        throw new Error('Profissional não encontrado');
    }

    return await prisma.profissional.update({
        where: {id},
        data: {
            nome_profissional,
            crm,
            especialidade,
            localizacao,
            faixa_etaria,
            atendimentos_gratuitos,
            foto_perfil
        }
    });
};

const excluirProfissional = async (id) => {
    const profissional = await prisma.profissional.findUnique({
        where: {id},
    });

    if (!profissional) {
        throw new Error('Profissional não encontrado');
    }

    return await prisma.profissional.delete({
        where: {id},
    });
};

module.exports = {
    listarProfissional,
    buscarProfissionalPorId,
    criarProfissional,
    atualizarProfissional,
    excluirProfissional
}