import { prisma } from "../../database/index";
import { LawyerNotFoundError } from "../../errors";
import { DaySchedule, DurationSchedule, TimeSchedule } from "../../validators";

interface IUserRequest {
    fk_advogado: number;
    dia: string;
    hora_inicio: string;
    hora_final: string;
    duracao: number;
}

class ConfigSchedulUseCase {
    async execute(userRequest: Array<IUserRequest>) {
        let daysValidate: string[] = [];

        userRequest.map((x) => {
            daysValidate.push(x.dia);
        });

        let durarionsValidate: number[] = [];

        userRequest.map((x) => {
            durarionsValidate.push(x.duracao);
        });

        //validacao dos dias recebidos
        DaySchedule.validate(daysValidate);

        //validacao das duracoes recebidas
        DurationSchedule.validate(durarionsValidate);

        for (let value of userRequest.values()) {
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
}

export { ConfigSchedulUseCase };
