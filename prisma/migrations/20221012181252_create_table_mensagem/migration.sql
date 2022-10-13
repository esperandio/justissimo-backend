-- CreateTable
CREATE TABLE "mensagens" (
    "id_mensagem" SERIAL NOT NULL,
    "fk_cliente" INTEGER NOT NULL,
    "fk_advogado" INTEGER NOT NULL,
    "mensagem" VARCHAR(255) NOT NULL,
    "dt_mensagem" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mensagens_pkey" PRIMARY KEY ("id_mensagem")
);

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "cliente"("id_cliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mensagens" ADD CONSTRAINT "mensagens_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE CASCADE ON UPDATE CASCADE;
