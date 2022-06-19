import { prisma } from "../../database";
import { DomainError, LawyerNotFoundError } from "../../errors";
import { PastDate } from "../../validators";
import { AvailableHoursForScheduling } from "../../validators/available-hours-for-scheduling";
import { DateConvertedBr } from "../../validators/date-converted-br";

interface IListHoursForSchedulingRequest{
    id_lawyer: number;
    date_for_scheduling: string;
}

interface IListHoursForSchedulingResponse{
    horarios_disponiveis: Array<String>;
    tempo_sessao: number;
}

class ListHoursForSchedulingUseCase {
    async execute(listHoursRequest: IListHoursForSchedulingRequest): Promise<IListHoursForSchedulingResponse> {
        const daysOfWeek = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
        const advogado = await prisma.advogado.findUnique({
            where: {
               id_advogado: listHoursRequest.id_lawyer,
            }
        });

        if (!advogado) {
            throw new LawyerNotFoundError();
        }
        
        let today = new Date().toLocaleString('pt-br');
        const dateNowConverted = DateConvertedBr.getDatewhitoutHours(today); 
        
        const dateForScheduling = new Date(listHoursRequest.date_for_scheduling + "T00:00:00.000Z");

        if (dateNowConverted.getTime() > dateForScheduling.getTime()) {
            throw new DomainError(`Campo (data_para_agendamento) inválido, data inferior a data atual: [${listHoursRequest.date_for_scheduling}]`)
        }

        const configLawyerSchedule = await prisma.configuracao_agenda.findFirst({
            where: {
                fk_advogado: listHoursRequest.id_lawyer,
                dia: daysOfWeek[dateForScheduling.getUTCDay()]
            }
        });

        if (!configLawyerSchedule) {
            throw new DomainError('Não foi possivel encontrar horários disponíveis para agendamento porque o advogado não atende no dia informado!');
        }

        const schedulingsAlreadyDoneToSpecificDay = await prisma.agendamento.findMany({
            where: {
                data_agendamento: dateForScheduling               
            },
        });

        const tempo_sessao = configLawyerSchedule.duracao;
        const horarios_disponiveis = AvailableHoursForScheduling.validate(schedulingsAlreadyDoneToSpecificDay, 
                                                                                 configLawyerSchedule.hora_inicial, 
                                                                                 configLawyerSchedule.hora_final, 
                                                                                 dateForScheduling, 
                                                                                 configLawyerSchedule.duracao);
        
        return {horarios_disponiveis, tempo_sessao}
    }
}

export { ListHoursForSchedulingUseCase }