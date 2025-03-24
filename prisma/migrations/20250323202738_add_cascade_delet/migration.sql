-- DropForeignKey
ALTER TABLE "Paciente" DROP CONSTRAINT "Paciente_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Profissional" DROP CONSTRAINT "Profissional_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Profissional" ALTER COLUMN "foto_perfil" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profissional" ADD CONSTRAINT "Profissional_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
