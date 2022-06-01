import { prisma } from "../../database/index";
import { DomainError, LawyerNotFoundError } from "../../errors";
import { NonEmptyString } from "../../validators";

interface IUserRequest {
    fk_advogado: number;
    dia: string;
    hora_inicio: string;
    hora_final: string;
    duracao: number;
}

class ConfigSchedulUseCase {
    async execute(userRequest : Array<IUserRequest>) {

        for (let value of userRequest.values()) {
            const fk_advogado = value.fk_advogado;
            const dia = NonEmptyString.validate('dia', value.dia);
            const hora_inicio = NonEmptyString.validate('hora_inicio', value.hora_inicio);
            const hora_final =  NonEmptyString.validate('hora_final', value.hora_final);
            const duracao = value.duracao;

            const userExists = await prisma.advogado.findUnique({
                where: {
                    id_advogado: fk_advogado
                }
            });

            if (userExists == null) {
                throw new LawyerNotFoundError();
            }

            if (duracao < 30) {
                throw new DomainError("Tempo de duração menor que 30 minutos");
            }

            await prisma.configuracao_agenda.create({
                data: {
                    dia: dia.value,
                    duracao: duracao,
                    hora_final: hora_final.value,
                    hora_inicial: hora_inicio.value,
                    fk_advogado: fk_advogado,
                }
            });
            console.log("criado com sucesso!")
        }
    }
}

export { ConfigSchedulUseCase }