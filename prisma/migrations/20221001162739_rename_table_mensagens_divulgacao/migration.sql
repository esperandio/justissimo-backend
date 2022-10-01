/*
  Warnings:

  - You are about to drop the `mensagens_divulgaco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "mensagens_divulgaco" DROP CONSTRAINT "mensagens_divulgaco_fk_advogado_fkey";

-- DropForeignKey
ALTER TABLE "mensagens_divulgaco" DROP CONSTRAINT "mensagens_divulgaco_fk_cliente_fkey";

-- DropForeignKey
ALTER TABLE "mensagens_divulgaco" DROP CONSTRAINT "mensagens_divulgaco_fk_divulgacao_fkey";

-- DropTable
DROP TABLE "mensagens_divulgaco";

-- CreateTable
CREATE TABLE "mensagens_divulgacao" (
    "id_mensagem_divulgacao" SERIAL NOT NULL,
    "fk_divulgacao" INTEGER NOT NULL,
    "fk_cliente" INTEGER NOT NULL,
    "fk_advogado" INTEGER NOT NULL,
    "mensagem" VARCHAR(255) NOT NULL,
    "dt_mensagem" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mensagens_divulgacao_pkey" PRIMARY KEY ("id_mensagem_divulgacao")
);

-- AddForeignKey
ALTER TABLE "mensagens_divulgacao" ADD CONSTRAINT "mensagens_divulgacao_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "cliente"("id_cliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens_divulgacao" ADD CONSTRAINT "mensagens_divulgacao_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens_divulgacao" ADD CONSTRAINT "mensagens_divulgacao_fk_divulgacao_fkey" FOREIGN KEY ("fk_divulgacao") REFERENCES "divulgacao"("id_divulgacao") ON DELETE CASCADE ON UPDATE CASCADE;
