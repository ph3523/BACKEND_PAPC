const prisma = require('../prisma');

const listarDepoimentos = async () => {
    return await prisma.depoimento.findMany();
}

const buscarDepoimentoPorId = async (id) => {
    const depoimento = await prisma.depoimento.findUnique({
        where: {id}
    });

    if (!depoimento) {
        throw new Error('Depoimento não encontrado');
    }
    return depoimento;
};

const criarDepoimento = async ({pacienteId, texto}) => {
    return await prisma.depoimento.create({
        data: {
            pacienteId,
            texto,
        },
    });
};

const atualizarDepoimento = async (id, {texto}) => {
    const depoimento = await prisma.depoimento.findUnique({
        where: {id},
    });

    if (!depoimento) {
        throw new Error('Depoimento não encontrado');
    }

    return await prisma.depoimento.update({
        where: {id},
        data: {
            texto
        },
    });
};

const excluirDepoimento = async (id) => {
    const depoimento = await prisma.depoimento.findUnique({
        where: {id},
    });

    if (!depoimento) {
        throw new Error('Depoimento não encontrado');
    }

    return await prisma.depoimento.delete({
        where: {id},
    });
};

module.exports = {
    listarDepoimentos,
    buscarDepoimentoPorId,
    criarDepoimento,
    atualizarDepoimento,
    excluirDepoimento
};