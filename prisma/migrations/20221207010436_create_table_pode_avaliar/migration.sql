-- CreateTable
CREATE TABLE "pode_avaliar" (
    "id_pode_avaliar" SERIAL NOT NULL,
    "fk_advogado" INTEGER NOT NULL,
    "fk_cliente" INTEGER,

    CONSTRAINT "pode_avaliar_pkey" PRIMARY KEY ("id_pode_avaliar")
);

-- AddForeignKey
ALTER TABLE "pode_avaliar" ADD CONSTRAINT "pode_avaliar_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "cliente"("id_cliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pode_avaliar" ADD CONSTRAINT "pode_avaliar_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE CASCADE ON UPDATE CASCADE;
