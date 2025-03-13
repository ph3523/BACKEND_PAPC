const { prisma, Tipo_usuario } = require('../prisma');


const listarUsuario = async () => {
    return await prisma.usuario.findMany();
}

const buscarUsuarioPorId = async (id) => {
    const usuario = await prisma.usuario.findUnique({
        where: {id}
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado');
    }
    return usuario;
};

const criarUsuario = async ({nome, email, senha, tipo}) => {
    return await prisma.usuario.create({
        data: {
            nome,
            email,
            senha,
            tipo
        },
    });
};

const atualizarUsuario = async (id, {nome, email, senha, tipo}) => {
    const usuario = await prisma.usuario.findUnique({
        where: {id},
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado');
    }

    return await prisma.usuario.update({
        where: {id},
        data: {
            nome,
            email,
            senha,
            tipo
        },
    });
};

const excluirUsuario = async (id) => {
    const usuario = await prisma.usuario.findUnique({
        where: {id},
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado');
    }

    await prisma.usuario.delete({
        where: {id},
    });
};

module.exports = {
    listarUsuario,
    buscarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario,
};