const { PrismaClient, Tipo_usuario, Status_atendimento } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = {
    prisma,
    Tipo_usuario,
    Status_atendimento
};