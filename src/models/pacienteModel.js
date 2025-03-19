const prisma = require('../prisma');

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

const criarPaciente = async ({})