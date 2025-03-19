-- CreateEnum
CREATE TYPE "Tipo_usuario" AS ENUM ('PACIENTE', 'PROFISSIONAL');

-- CreateEnum
CREATE TYPE "Status_atendimento" AS ENUM ('AGENDADA', 'CONCLUIDA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Grupo_apoio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Grupo_apoio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Depoimento" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "data_postagem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pacienteId" INTEGER NOT NULL,

    CONSTRAINT "Depoimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "tipo" "Tipo_usuario" NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nome_paciente" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "genero" TEXT NOT NULL,
    "Endereco" TEXT NOT NULL,
    "telefone" TEXT,
    "queixas" TEXT NOT NULL,
    "historico_familiar" TEXT NOT NULL,
    "uso_medicamentos" TEXT NOT NULL,
    "objetivo_terapia" TEXT NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profissional" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "nome_profissional" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "faixa_etaria" TEXT NOT NULL,
    "atendimentos_gratuitos" BOOLEAN NOT NULL,
    "foto_perfil" TEXT NOT NULL,

    CONSTRAINT "Profissional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anamnese" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "data_anamnese" TIMESTAMP(3) NOT NULL,
    "relato_atendimento" TEXT NOT NULL,
    "ajustes_no_tratamento" TEXT NOT NULL,

    CONSTRAINT "Anamnese_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessao_atendimentos" (
    "id" SERIAL NOT NULL,
    "pacienteId" INTEGER NOT NULL,
    "profissionalId" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" "Status_atendimento" NOT NULL,
    "Avaliacao" TEXT NOT NULL,

    CONSTRAINT "Sessao_atendimentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_usuarioId_key" ON "Paciente"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_usuarioId_key" ON "Profissional"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_crm_key" ON "Profissional"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "Anamnese_pacienteId_key" ON "Anamnese"("pacienteId");

-- CreateIndex
CREATE UNIQUE INDEX "Anamnese_profissionalId_key" ON "Anamnese"("profissionalId");

-- AddForeignKey
ALTER TABLE "Depoimento" ADD CONSTRAINT "Depoimento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profissional" ADD CONSTRAINT "Profissional_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anamnese" ADD CONSTRAINT "Anamnese_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anamnese" ADD CONSTRAINT "Anamnese_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao_atendimentos" ADD CONSTRAINT "Sessao_atendimentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessao_atendimentos" ADD CONSTRAINT "Sessao_atendimentos_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
