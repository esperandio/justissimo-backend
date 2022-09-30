-- CreateTable
CREATE TABLE "mensagens_divulgaco" (
    "id_mensagem_divulgacao" SERIAL NOT NULL,
    "fk_divulgacao" INTEGER NOT NULL,
    "fk_cliente" INTEGER NOT NULL,
    "fk_advogado" INTEGER NOT NULL,
    "mensagem" VARCHAR(255) NOT NULL,
    "dt_mensagem" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mensagens_divulgaco_pkey" PRIMARY KEY ("id_mensagem_divulgacao")
);

-- AddForeignKey
ALTER TABLE "mensagens_divulgaco" ADD CONSTRAINT "mensagens_divulgaco_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "cliente"("id_cliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens_divulgaco" ADD CONSTRAINT "mensagens_divulgaco_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens_divulgaco" ADD CONSTRAINT "mensagens_divulgaco_fk_divulgacao_fkey" FOREIGN KEY ("fk_divulgacao") REFERENCES "divulgacao"("id_divulgacao") ON DELETE CASCADE ON UPDATE CASCADE;
