const prisma = require('../prisma');
const bcrypt = require('bcryptjs');


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


const criarUsuario = async (data) => {
    const hashedPassword = await bcrypt.hash(data.senha, 10);
    return await prisma.usuario.create({
        data: {
            nome_usuario: data.nome_usuario,
            email: data.email,
            senha: hashedPassword,
            tipo: data.tipo,
        },
    });
};

const atualizarUsuario = async (id, data) => {
    const usuario = await prisma.usuario.findUnique({
        where: {id},
    });

    if (!usuario) {
        throw new Error('Usuario não encontrado');
    }

    return await prisma.usuario.update({
        where: {id},
        data: {
            nome_usuario: data.nome_usuario,
            email: data.email,
            senha: data.senha,
            tipo: data.tipo,
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