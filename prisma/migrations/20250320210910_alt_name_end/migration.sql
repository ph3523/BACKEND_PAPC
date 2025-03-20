/*
  Warnings:

  - You are about to drop the column `Endereco` on the `Paciente` table. All the data in the column will be lost.
  - Added the required column `endereco` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paciente" DROP COLUMN "Endereco",
ADD COLUMN     "endereco" TEXT NOT NULL;
