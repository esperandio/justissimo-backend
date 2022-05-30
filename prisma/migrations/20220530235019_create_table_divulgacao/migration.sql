-- CreateTable
CREATE TABLE "area_atuacao" (
    "id_area_atuacao" SERIAL NOT NULL,
    "titulo" VARCHAR(100),

    CONSTRAINT "area_atuacao_pkey" PRIMARY KEY ("id_area_atuacao")
);

-- CreateTable
CREATE TABLE "divulgacao" (
    "id_avaliacao" SERIAL NOT NULL,
    "fk_area_atuacao" INTEGER NOT NULL,
    "fk_cliente" INTEGER NOT NULL,
    "titulo" VARCHAR(55) NOT NULL,
    "descricao" VARCHAR(255),

    CONSTRAINT "divulgacao_pkey" PRIMARY KEY ("id_avaliacao")
);

-- AddForeignKey
ALTER TABLE "divulgacao" ADD CONSTRAINT "divulgacao_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "cliente"("id_cliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "divulgacao" ADD CONSTRAINT "divulgacao_fk_area_atuacao_fkey" FOREIGN KEY ("fk_area_atuacao") REFERENCES "area_atuacao"("id_area_atuacao") ON DELETE CASCADE ON UPDATE CASCADE;
