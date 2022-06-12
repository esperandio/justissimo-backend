import { prisma } from "../../database";
import { DomainError, NotFoundError } from "../../errors";
import { DaySchedule, NonEmptyString } from "../../validators";
import { HourSchedule } from "../../validators/hour-scheduling";
import { ParmsScheduling } from "../../validators/parms-scheduling";

interface ICreateSchedulingRequest {
    fk_advogado:        number;
    fk_cliente:         number;
    fk_advogado_area:   number;
    causa:              string;    
    data_agendamento:   string;
    duracao:            number;     
    horario:            string;  
    dia:                string;        
    observacao:         string;
}

class CreateSchedulingUseCase {
    async execute(createSchedulingRequest: ICreateSchedulingRequest) {

        if (ParmsScheduling.validate(createSchedulingRequest)) {
            const date_scheduling = new Date(createSchedulingRequest.data_agendamento);
            const hour_scheduling = new Date("0001-01-01T" + createSchedulingRequest.horario + ":00.000Z");
            
            const userClient = await prisma.cliente.findUnique({
                where: {
                    id_cliente: createSchedulingRequest.fk_cliente,
                },
                include: {
                    usuario: true,
                },
              });
    
            if (!userClient) {
                throw new NotFoundError('Cliente não encontrado!');
            }
    
            const userLawyer = await prisma.advogado.findUnique({
                where: {
                    id_advogado: createSchedulingRequest.fk_advogado,
                }
              });
                     
            if (!userLawyer) {
                throw new NotFoundError('Advogado não encontrado!');
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
                throw new DomainError('Não foi possível cadastrar o agendamento, pois, já existe um agendamento  para a data e horário informados!');
            }

            await prisma.agendamento.create({
                data: {
                    fk_advogado: createSchedulingRequest.fk_advogado,
                    fk_cliente: createSchedulingRequest.fk_cliente,
                    fk_advogado_area: createSchedulingRequest.fk_advogado_area,
                    causa: createSchedulingRequest.causa,
                    contato_cliente: userClient.usuario?.email ?? "",
                    data_agendamento: date_scheduling,
                    dia:createSchedulingRequest.dia.toUpperCase(),
                    duracao: createSchedulingRequest.duracao,
                    horario: hour_scheduling,
                    observacao: createSchedulingRequest.observacao
                }
            });
        }
    }
}

export { CreateSchedulingUseCase }