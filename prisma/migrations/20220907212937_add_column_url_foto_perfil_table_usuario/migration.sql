/*
  Warnings:

  - Added the required column `url_foto_perfil` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "url_foto_perfil" VARCHAR(500) NOT NULL;
