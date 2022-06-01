-- CreateTable
CREATE TABLE "advogado_area" (
    "fk_advogado" INTEGER NOT NULL,
    "fk_area_atuacao" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "advogado_area_fk_advogado_fk_area_atuacao_key" ON "advogado_area"("fk_advogado", "fk_area_atuacao");

-- AddForeignKey
ALTER TABLE "advogado_area" ADD CONSTRAINT "advogado_area_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advogado_area" ADD CONSTRAINT "advogado_area_fk_area_atuacao_fkey" FOREIGN KEY ("fk_area_atuacao") REFERENCES "area_atuacao"("id_area_atuacao") ON DELETE CASCADE ON UPDATE CASCADE;
