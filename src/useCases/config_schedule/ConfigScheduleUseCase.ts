import { prisma } from "../../database/index";
import { LawyerNotFoundError, NotFoundError } from "../../errors";
import { DaySchedule, DurationSchedule, TimeSchedule, NonEmptyArray } from "../../validators";

interface IUserRequest {
    dia: string;
    hora_inicio: string;
    hora_final: string;
    duracao: number;
}

interface IDadosRequest {
    dados : IDaysRequest;
}

interface IDaysRequest {
    fk_advogado: number;
    dias_inserir: Array<IUserRequest>;
}
class ConfigSchedulUseCase {
    async execute(userRequest: IDadosRequest) {
        let dados = userRequest.dados;
        let daysInsert = dados.dias_inserir;
        
        DaySchedule.validate(daysInsert.map((x) => (x.dia)));

        const durations = NonEmptyArray.validate("duracao", daysInsert.map((x) => x.duracao));        

        //validacao das duracoes recebidas
        DurationSchedule.validate(durations.values);
        
        const userExists = await prisma.advogado.findUnique({
            where: {
                id_advogado: dados.fk_advogado,
            },
        });

        if (userExists == null) {
            throw new LawyerNotFoundError();
        }

        if (daysInsert.length > 0) {
            await prisma.configuracao_agenda.deleteMany({
                where: {
                    fk_advogado: dados.fk_advogado,
                },
            });

            for (let value of daysInsert.values()) {
                const fk_advogado = dados.fk_advogado;
                const dia = value.dia.toUpperCase();
                const validateTime = TimeSchedule.validate(
                    new Date("0001-01-01T" + value.hora_inicio + ":00.000Z"),
                    new Date("0001-01-01T" + value.hora_final + ":00.000Z")
                );
                const duracao = value.duracao;

                await prisma.configuracao_agenda.create({
                    data: {
                        dia: dia,
                        duracao: duracao,
                        hora_final: validateTime.valueFinal,
                        hora_inicial: validateTime.valueInit,
                        fk_advogado: fk_advogado,
                    }
                });
            }    
        }
    }
}

export { ConfigSchedulUseCase };
