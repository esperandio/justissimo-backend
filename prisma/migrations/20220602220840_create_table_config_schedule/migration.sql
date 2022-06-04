-- CreateTable
CREATE TABLE "configuracao_agenda" (
    "id_configuracao_agenda" SERIAL NOT NULL,
    "fk_advogado" INTEGER NOT NULL,
    "dia" VARCHAR(45) NOT NULL,
    "hora_inicial" TIMESTAMP(3) NOT NULL,
    "hora_final" TIMESTAMP(3) NOT NULL,
    "duracao" INTEGER NOT NULL,

    CONSTRAINT "configuracao_agenda_pkey" PRIMARY KEY ("id_configuracao_agenda")
);

-- AddForeignKey
ALTER TABLE "configuracao_agenda" ADD CONSTRAINT "configuracao_agenda_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE CASCADE ON UPDATE CASCADE;
