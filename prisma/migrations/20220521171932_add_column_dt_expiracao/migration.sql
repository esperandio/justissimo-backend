-- AlterTable
ALTER TABLE "recuperacao_senha" ADD COLUMN     "dt_expiracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
