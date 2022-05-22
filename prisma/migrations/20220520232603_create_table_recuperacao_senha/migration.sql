-- CreateTable
CREATE TABLE "recuperacao_senha" (
    "id_recuperacao_senha" SERIAL NOT NULL,
    "fk_usuario" INTEGER NOT NULL,
    "codigo_recuperacao" VARCHAR(100) NOT NULL,

    CONSTRAINT "recuperacao_senha_pkey" PRIMARY KEY ("id_recuperacao_senha")
);

-- AddForeignKey
ALTER TABLE "recuperacao_senha" ADD CONSTRAINT "recuperacao_senha_fk_usuario_fkey" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;
