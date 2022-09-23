-- AlterTable
ALTER TABLE "agendamento" ADD COLUMN     "area_atuacao" VARCHAR(100);

update
	"agendamento" 
set
	"nome_cliente" = "cliente".nome
from
	"cliente" 
where
	"cliente"."id_cliente" = "agendamento".fk_cliente;

update
	"agendamento" 
set
	"area_atuacao"  = "area_atuacao".titulo
from
	"area_atuacao"  
where
	"area_atuacao"."id_area_atuacao"  = "agendamento".fk_advogado_area;