-- AlterTable
ALTER TABLE "agendamento" ADD COLUMN     "encerrado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nome_cliente" VARCHAR(200),
ALTER COLUMN "fk_cliente" DROP NOT NULL;
