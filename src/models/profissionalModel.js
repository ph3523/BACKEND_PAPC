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

const criarProfissional = async (data) => {
    
    // verificação se o usuario existe
    const usuario = await buscarUsuarioPorId(data.usuarioId);

     // verificação se o usuario é um profissional
    if (usuario.tipo !== 'PROFISSIONAL') {
        throw new Error('Usuário não é um profissional');
    }

    // verifica se já existe um profissional com o usuarioId
    const profissionalExistente = await prisma.profissional.findUnique({
        where: {usuarioId: data.usuarioId}
    });

    if (profissionalExistente) {
        throw new Error('Profissional já cadastrado');
    }
    
    // verificar se um crm já está cadastrado
    const crmExistente = await prisma.profissional.findUnique({
        where: {crm: data.crm}
    });

    if (crmExistente) {
        throw new Error('CRM já cadastrado');
    }

    return await prisma.profissional.create({
        data: {
            usuarioId: data.usuarioId,
            nome_profissional: data.nome_profissional,
            crm: data.crm,
            especialidade: data.especialidade,
            localizacao: data.localizacao,
            faixa_etaria: data.faixa_etaria,
            atendimentos_gratuitos: data.atendimentos_gratuitos,
            foto_perfil: data.foto_perfil,
        },
    });

};

const atualizarProfissional = async (id, data) => {
    const profissional = await prisma.profissional.findUnique({
        where: {id},
    });

    if (!profissional) {
        throw new Error('Profissional não encontrado');
    }

    return await prisma.profissional.update({
        where: {id},
        data: {
            usuarioId: data.usuarioId,
            nome_profissional: data.nome_profissional,
            crm: data.crm,
            especialidade: data.especialidade,
            localizacao: data.localizacao,
            faixa_etaria: data.faixa_etaria,
            atendimentos_gratuitos: data.atendimentos_gratuitos,
            foto_perfil: data.foto_perfil,
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