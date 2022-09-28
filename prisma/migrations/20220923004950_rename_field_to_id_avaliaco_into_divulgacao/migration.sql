/*
  Warnings:

  - The primary key for the `divulgacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_avaliacao` on the `divulgacao` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "divulgacao" DROP CONSTRAINT "divulgacao_pkey",
DROP COLUMN "id_avaliacao",
ADD COLUMN     "id_divulgacao" SERIAL NOT NULL,
ADD CONSTRAINT "divulgacao_pkey" PRIMARY KEY ("id_divulgacao");
