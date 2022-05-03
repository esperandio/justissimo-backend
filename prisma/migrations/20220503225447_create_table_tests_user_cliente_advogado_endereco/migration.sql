/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "senha" VARCHAR(200) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id_cliente" SERIAL NOT NULL,
    "fk_usuario" INTEGER,
    "nome" VARCHAR(55) NOT NULL,
    "dt_nascimento" TIMESTAMP(3) NOT NULL,
    "nr_cpf" VARCHAR(11) NOT NULL,
    "nr_cnpj" VARCHAR(14) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "advogado" (
    "id_advogado" SERIAL NOT NULL,
    "fk_usuario" INTEGER,
    "nome" VARCHAR(55) NOT NULL,
    "dt_nascimento" TIMESTAMP(3) NOT NULL,
    "nr_cna" INTEGER NOT NULL,
    "uf_cna" VARCHAR(2) NOT NULL,
    "nr_cpf" VARCHAR(11) NOT NULL,
    "nr_cnpj" VARCHAR(14) NOT NULL,
    "tel_fixo" VARCHAR(45) NOT NULL,
    "tel_celular" VARCHAR(45) NOT NULL,

    CONSTRAINT "advogado_pkey" PRIMARY KEY ("id_advogado")
);

-- CreateTable
CREATE TABLE "endereco" (
    "id_endereco" SERIAL NOT NULL,
    "fk_cliente" INTEGER,
    "fk_advogado" INTEGER,
    "nr_cep" VARCHAR(8) NOT NULL,
    "numero" INTEGER NOT NULL,
    "rua" VARCHAR(100) NOT NULL,
    "bairro" VARCHAR(100) NOT NULL,
    "cidade" VARCHAR(100) NOT NULL,
    "estado" VARCHAR(100) NOT NULL,
    "logradouro" VARCHAR(100) NOT NULL,
    "complemento" VARCHAR(60) NOT NULL,

    CONSTRAINT "endereco_pkey" PRIMARY KEY ("id_endereco")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_fk_usuario_key" ON "cliente"("fk_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "advogado_fk_usuario_key" ON "advogado"("fk_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "endereco_fk_cliente_key" ON "endereco"("fk_cliente");

-- CreateIndex
CREATE UNIQUE INDEX "endereco_fk_advogado_key" ON "endereco"("fk_advogado");

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_fk_usuario_fkey" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advogado" ADD CONSTRAINT "advogado_fk_usuario_fkey" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("id_usuario") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "cliente"("id_cliente") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE SET NULL ON UPDATE CASCADE;
