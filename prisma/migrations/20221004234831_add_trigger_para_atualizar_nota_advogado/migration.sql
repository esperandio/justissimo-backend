-- Trigger para atualizar a nota do advogado quando uma avaliação for inserida ou atualizada
CREATE OR REPLACE FUNCTION atualizar_nota_advogado()
    RETURNS TRIGGER
    LANGUAGE plpgsql
    AS $$
    BEGIN
		update advogado 
		set nota = (select round( avg(a.nota)::numeric, 2)  from avaliacao a where a.fk_advogado = NEW.fk_advogado)
		where id_advogado = NEW.fk_advogado;

        return NEW;
    END;
    $$;

CREATE OR REPLACE TRIGGER check_update
    after insert or update ON avaliacao
    FOR EACH ROW
    EXECUTE procedure atualizar_nota_advogado();

-- Upadate de nota do advogado
update 
	"advogado" 
		set "nota" = (select round( avg("avaliacao".nota)::numeric, 2)  from "avaliacao" where "avaliacao"."fk_advogado" = "advogado".id_advogado)
from 
	"avaliacao"
where
	"advogado".id_advogado = "avaliacao"."fk_advogado";