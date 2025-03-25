/*
  Warnings:

  - Added the required column `gratuito` to the `Grupo_apoio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publico_alvo` to the `Grupo_apoio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo_atendimento` to the `Grupo_apoio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `Grupo_apoio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grupo_apoio" ADD COLUMN     "gratuito" BOOLEAN NOT NULL,
ADD COLUMN     "publico_alvo" TEXT NOT NULL,
ADD COLUMN     "tipo_atendimento" TEXT NOT NULL,
ADD COLUMN     "valor" TEXT NOT NULL;
