-- DropForeignKey
ALTER TABLE "advogado" DROP CONSTRAINT "advogado_fk_usuario_fkey";

-- DropForeignKey
ALTER TABLE "cliente" DROP CONSTRAINT "cliente_fk_usuario_fkey";

-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "endereco_fk_advogado_fkey";

-- DropForeignKey
ALTER TABLE "endereco" DROP CONSTRAINT "endereco_fk_cliente_fkey";

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_fk_usuario_fkey" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advogado" ADD CONSTRAINT "advogado_fk_usuario_fkey" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_fk_cliente_fkey" FOREIGN KEY ("fk_cliente") REFERENCES "cliente"("id_cliente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "endereco" ADD CONSTRAINT "endereco_fk_advogado_fkey" FOREIGN KEY ("fk_advogado") REFERENCES "advogado"("id_advogado") ON DELETE CASCADE ON UPDATE CASCADE;
