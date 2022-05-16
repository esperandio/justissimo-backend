-- CreateTable
CREATE TABLE "avaliacao" (
    "id_avaliacao" SERIAL NOT NULL,
    "fk_cliente" INTEGER,
    "fk_advogado" INTEGER,
    "nota" INTEGER NOT NULL,
    "descricao" VARCHAR(200),

    CONSTRAINT "avaliacao_pkey" PRIMARY KEY ("id_avaliacao")
);

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "cliente"("id_cliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacao" ADD CONSTRAINT "avaliacao_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE CASCADE ON UPDATE CASCADE;
