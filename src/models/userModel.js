const prisma = require('../prisma');


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

const buscarUsuarioPorEmail = async (email) => {
    const usuario = await prisma.usuario.findUnique({
        where: {email}
    });
    return usuario;
};


const criarUsuario = async ({nome_usuario, email, senha, tipo}) => {
    return await prisma.usuario.create({
        data: {
            nome_usuario,
            email,
            senha,
            tipo,
        },
    });
};

const atualizarUsuario = async (id, {nome_usuario, email, senha, tipo}) => {
    const usuario = await prisma.usuario.findUnique({
        where: {id},
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado');
    }

    return await prisma.usuario.update({
        where: {id},
        data: {
            nome_usuario,
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
    buscarUsuarioPorEmail,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario,
};