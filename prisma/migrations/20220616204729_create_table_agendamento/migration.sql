-- AlterTable
ALTER TABLE "advogado" ADD COLUMN IF NOT EXISTS "nota" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "agendamento" (
    "id_agenda" SERIAL NOT NULL,
    "fk_advogado" INTEGER NOT NULL,
    "fk_cliente" INTEGER NOT NULL,
    "fk_advogado_area" INTEGER NOT NULL,
    "causa" VARCHAR(45) NOT NULL,
    "data_agendamento" TIMESTAMP(3) NOT NULL,
    "duracao" INTEGER NOT NULL,
    "horario" TIMESTAMP(3) NOT NULL,
    "observacao" VARCHAR(200),
    "contato_cliente" VARCHAR(200) NOT NULL,
    "data_criacao_agendamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "agendamento_pkey" PRIMARY KEY ("id_agenda")
);

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "cliente"("id_cliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamento" ADD CONSTRAINT "agendamento_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE CASCADE ON UPDATE CASCADE;
