const prisma = require('../prisma');

const listarGrupoApoio = async () => {
    return await prisma.grupo_apoio.findMany();
};

const buscarGrupoApoioPorId = async (id) => {
    const grupo = await prisma.grupo_apoio.findUnique({
        where: {id}
    });

    if (!grupo) {
        throw new Error('Grupo de apoio não encontrado');
    }
    return grupo;
};

const criarGrupoApoio = async (data) => {
    

    return await prisma.grupo_apoio.create({
        data: {
            nome: data.nome,
            descricao: data.descricao,
            local: data.local,
            horario: data.horario,
            publico_alvo: data.publico_alvo,
            tipo_atendimento: data.tipo_atendimento,
            gratuito: data.gratuito,
            valor: data.valor,
            image: data.image
        },
    });
};

const atualizarGrupoApoio = async (id, data) => {
    const grupo = await prisma.grupo_apoio.findUnique({
        where: {id},
    });

    if (!grupo) {
        throw new Error('Grupo de apoio não encontrado');
    }

    return await prisma.grupo_apoio.update({
        where: {id},
        data: {
            nome: data.nome,
            descricao: data.descricao,
            local: data.local,
            horario: data.horario,
            publico_alvo: data.publico_alvo,
            tipo_atendimento: data.tipo_atendimento,
            gratuito: data.gratuito,
            valor: data.valor,
            image: data.image
        },
    });
};

const excluirGrupoApoio = async (id) => {
    const grupo = await prisma.grupo_apoio.findUnique({
        where: {id},
    });

    if (!grupo) {
        throw new Error('Grupo de apoio não encontrado');
    }

    return await prisma.grupo_apoio.delete({
        where: {id},
    });
};

module.exports = {
    listarGrupoApoio,
    buscarGrupoApoioPorId,
    criarGrupoApoio,
    atualizarGrupoApoio,
    excluirGrupoApoio
};