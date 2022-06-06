import { prisma } from "../../database/index";
import { LawyerNotFoundError, NotFoundError } from "../../errors";
import { DaySchedule, DurationSchedule, TimeSchedule, NonEmptyArray } from "../../validators";

interface IUserRequest {
    fk_advogado: number;
    dia: string;
    hora_inicio: string;
    hora_final: string;
    duracao: number;
}

interface IDadosRequest {
    dados : IDaysRequest;
}

interface IDaysRequest {
    dias_inserir: Array<IUserRequest>;
    dias_remover: Array<IUserRequest>;
}
class ConfigSchedulUseCase {
    async execute(userRequest: IDadosRequest) {
        let dados = userRequest.dados;
        let daysInsert = dados.dias_inserir;
        let daysRemove = dados.dias_remover;

        //validacao dos dias_inserir recebidos 
        DaySchedule.validate(daysInsert.map((x) => (x.dia)));
        //validacao dos dias_remover recebidos
        DaySchedule.validate(daysRemove.map((x) => (x.dia)));
        //Validar se existe o mesmo dia nos dois arrays.
        DaySchedule.validadeDuplicateDataArrays(daysRemove.map((x) => x.dia), 
                                                daysInsert.map((x) => x.dia)
                                                );

        const durations = NonEmptyArray.validate("duracao", daysInsert.map((x) => x.duracao));        

        //validacao das duracoes recebidas
        DurationSchedule.validate(durations.values);

        if (daysInsert.length > 0) {
            for (let value of daysInsert.values()) {
                const fk_advogado = value.fk_advogado;
                const dia = value.dia.toUpperCase();
                const validateTime = TimeSchedule.validate(
                    new Date("0001-01-01T" + value.hora_inicio + ":00.000Z"),
                    new Date("0001-01-01T" + value.hora_final + ":00.000Z")
                );
                const duracao = value.duracao;
    
                const userExists = await prisma.advogado.findUnique({
                    where: {
                        id_advogado: fk_advogado,
                    },
                });
    
                if (userExists == null) {
                    throw new LawyerNotFoundError();
                }
    
                const configAlreadyExists = await prisma.configuracao_agenda.findFirst({
                    where: {
                        dia: dia,
                        fk_advogado: fk_advogado,
                    },
                });
    
                if (configAlreadyExists) {
                    await prisma.configuracao_agenda.update({
                        where: {
                            id_configuracao_agenda: configAlreadyExists.id_configuracao_agenda
                        },
                        data: {
                            dia: dia,
                            duracao: duracao,
                            hora_final: validateTime.valueFinal,
                            hora_inicial: validateTime.valueInit,
                            fk_advogado: fk_advogado,
                        }
                    });
                } else {
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

        if (daysRemove.length > 0) {
            for (let value of daysRemove.values()) {
                const userExists = await prisma.advogado.findUnique({
                    where: {
                        id_advogado: value.fk_advogado,
                    },
                });
    
                if (userExists == null) {
                    throw new LawyerNotFoundError();
                }

                const configAlreadyExists = await prisma.configuracao_agenda.findFirst({
                    where: {
                        dia: value.dia.toUpperCase(),
                        fk_advogado: value.fk_advogado,
                    },
                });

                if (configAlreadyExists) {
                    await prisma.configuracao_agenda.delete({
                        where: {
                            id_configuracao_agenda: configAlreadyExists.id_configuracao_agenda
                        }
                    });
                }
                else {
                    throw new NotFoundError("Ação não foi concluida, registro não encontrado");
                }
            }
        }
    }
}

export { ConfigSchedulUseCase };
