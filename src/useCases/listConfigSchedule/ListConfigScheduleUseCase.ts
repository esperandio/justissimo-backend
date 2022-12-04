import { Configuracao_agenda } from "@prisma/client";
import { prisma } from "../../database";
import { DomainError, LawyerNotFoundError } from "../../errors";

interface IConfigScheduleResponse {
    de: string;
    ate: string;
    hora_inicial: Date;
    hora_final: Date;
    duracao: number;
}

class ListConfigScheduleUseCase {
    async execute(lawyer_id: number) {
     
        if (lawyer_id == null || lawyer_id == undefined || isNaN(lawyer_id)) {
            throw new DomainError("ID do advogado inválido! Informado: " + lawyer_id);
        }

        const lawyer = await prisma.advogado.findUnique({
            where: {
                id_advogado: lawyer_id
            }
        });

        if (lawyer == null) {
            throw new LawyerNotFoundError();
        }


        const configSchedule = await prisma.configuracao_agenda.findMany({
            where: {
                fk_advogado: lawyer_id
            },
            select: {
                dia: true,
                hora_inicial: true,
                hora_final: true,
                duracao: true
            }
        });

        if (configSchedule.length > 0) {
            const configScheduleResponse: IConfigScheduleResponse = {
                de: configSchedule[0].dia,
                ate: configSchedule[configSchedule.length - 1].dia,
                hora_inicial: configSchedule[0].hora_inicial,
                hora_final: configSchedule[0].hora_final,
                duracao: configSchedule[0].duracao
            }
    
            return configScheduleResponse;
        }
        
        return [];
        
    }
}

export { ListConfigScheduleUseCase }