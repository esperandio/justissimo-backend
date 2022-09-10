/*
  Warnings:

  - Added the required column `tipo_usuario` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "tipo_usuario" VARCHAR(15) NOT NULL;
