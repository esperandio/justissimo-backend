import { prisma } from "../../database";
import { DomainError, NotFoundError, ClientNotFoundError, LawyerNotFoundError } from "../../errors";
import { ParmsScheduling } from "../../validators/parms-scheduling";
import { TimeForScheduling } from "../../validators/time-for-scheduling";

interface ICreateSchedulingRequest {
    fk_advogado:        number;
    fk_cliente:         number;
    fk_advogado_area:   number;
    causa:              string;    
    data_agendamento:   string;    
    horario:            string;  
    dia:                string;        
    observacao:         string;
}

class CreateSchedulingUseCase {
    async execute(createSchedulingRequest: ICreateSchedulingRequest) {
        ParmsScheduling.validate(createSchedulingRequest);
        
        const date_scheduling = new Date(createSchedulingRequest.data_agendamento + "T00:00:00.000Z");
        const hour_scheduling = new Date("0001-01-01T" + createSchedulingRequest.horario + ":00.000Z");

        const schedulingsAlreadyDoneToSpecificDay = await prisma.agendamento.findMany({
            where: {
                data_agendamento: {
                    gte: new Date(createSchedulingRequest.data_agendamento + "T00:00:00.000Z"),
                    lte: new Date(createSchedulingRequest.data_agendamento + "T00:00:00.000Z")
                },
            },
        });

        const userClient = await prisma.cliente.findUnique({
            where: {
                id_cliente: createSchedulingRequest.fk_cliente,
            },
            include: {
                usuario: true,
            },
        });

        if (!userClient) {
            throw new ClientNotFoundError();
        }

        const userLawyer = await prisma.advogado.findUnique({
            where: {
                id_advogado: createSchedulingRequest.fk_advogado,
            }
        });

        if (!userLawyer) {
            throw new LawyerNotFoundError();
        }

        const userLawyerArea = await prisma.advogadoArea.findFirst({
            where: {
                fk_advogado: createSchedulingRequest.fk_advogado,
                fk_area_atuacao: createSchedulingRequest.fk_advogado_area,
            }
        });

        if (!userLawyerArea) {
            throw new NotFoundError('Advogado não pertence a área de atuação informada!');
        }

        const schedulingAlreadyExists = await prisma.agendamento.findFirst({
            where: {
                fk_advogado: createSchedulingRequest.fk_advogado,
                data_agendamento: date_scheduling,
                horario: hour_scheduling
            }
        });

        if (schedulingAlreadyExists) {
            throw new DomainError('Não foi possível cadastrar o agendamento pois já existe um agendamento para a data e horário informados!');
        }
        
        const configLawyerSchedule = await prisma.configuracao_agenda.findFirst({
            where: {
                fk_advogado: userLawyer.id_advogado
            }
        });

        if (!configLawyerSchedule) {
            throw new DomainError('Não foi possivel cadastrar o agendameto pois o advogado não atende no dia informado!');
        }

        TimeForScheduling.validate(schedulingsAlreadyDoneToSpecificDay, configLawyerSchedule.hora_inicial, configLawyerSchedule.hora_final, hour_scheduling, configLawyerSchedule.duracao);

        await prisma.agendamento.create({
            data: {
                fk_advogado: createSchedulingRequest.fk_advogado,
                fk_cliente: createSchedulingRequest.fk_cliente,
                fk_advogado_area: createSchedulingRequest.fk_advogado_area,
                causa: createSchedulingRequest.causa,
                contato_cliente: userClient.usuario?.email ?? "",
                data_agendamento: date_scheduling,
                duracao: configLawyerSchedule.duracao,
                horario: hour_scheduling,
                observacao: createSchedulingRequest.observacao
            }
        });
    }
}

export { CreateSchedulingUseCase }