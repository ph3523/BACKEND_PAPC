/*
  Warnings:

  - You are about to drop the column `historico_familiar` on the `Anamnese` table. All the data in the column will be lost.
  - You are about to drop the column `objetivo_terapia` on the `Anamnese` table. All the data in the column will be lost.
  - You are about to drop the column `queixas` on the `Anamnese` table. All the data in the column will be lost.
  - You are about to drop the column `uso_medicamentos` on the `Anamnese` table. All the data in the column will be lost.
  - Added the required column `ajustes_no_tratamento` to the `Anamnese` table without a default value. This is not possible if the table is not empty.
  - Added the required column `data_anamnese` to the `Anamnese` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profissionalId` to the `Anamnese` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relato_atendimento` to the `Anamnese` table without a default value. This is not possible if the table is not empty.
  - Added the required column `historico_familiar` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objetivo_terapia` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `queixas` to the `Paciente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uso_medicamentos` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Status_atendimento" ADD VALUE 'CANCELADA';

-- AlterTable
ALTER TABLE "Anamnese" DROP COLUMN "historico_familiar",
DROP COLUMN "objetivo_terapia",
DROP COLUMN "queixas",
DROP COLUMN "uso_medicamentos",
ADD COLUMN     "ajustes_no_tratamento" TEXT NOT NULL,
ADD COLUMN     "data_anamnese" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "profissionalId" INTEGER NOT NULL,
ADD COLUMN     "relato_atendimento" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Paciente" ADD COLUMN     "historico_familiar" TEXT NOT NULL,
ADD COLUMN     "objetivo_terapia" TEXT NOT NULL,
ADD COLUMN     "queixas" TEXT NOT NULL,
ADD COLUMN     "uso_medicamentos" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Anamnese" ADD CONSTRAINT "Anamnese_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
