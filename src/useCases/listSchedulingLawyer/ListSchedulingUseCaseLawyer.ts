import { Agendamento } from "@prisma/client";
import { prisma } from "../../database";
import { DomainError } from "../../errors";
import { NonEmptyString } from "../../validators";

interface IListSchedulingRequest{
    fk_lawyer: string;
    date_init: string;
    date_final: string;
    area: string;
    encerrado: boolean;
}

class ListSchedulingUseCaseLawyer {
    async execute(listSchedulingRequest: IListSchedulingRequest): Promise<Agendamento[]> {
        let filterDateInit;
        let filterDateFinal;
        let filterLawyer = {};
        let filterArea = {};
        let filterEncerrado = {};

        if (!NonEmptyString.isEmpty(listSchedulingRequest.date_init) && !NonEmptyString.isEmpty(listSchedulingRequest.date_final)) {
            filterDateInit = new Date(listSchedulingRequest.date_init  + "T00:00:00.000Z");

            if (isNaN(filterDateInit.getTime())) {
                throw new DomainError('Campo data_inicial inválido, esperado uma data válida, recebido: ' + listSchedulingRequest.date_init);
            }

            filterDateFinal = new Date(listSchedulingRequest.date_final + "T00:00:00.000Z");

            if (isNaN(filterDateFinal.getTime())) {
                throw new DomainError('Campo data_final inválido, esperado uma data válida, recebido: ' + listSchedulingRequest.date_final);
            }

            if (filterDateInit.getTime() > filterDateFinal.getTime()) {
                throw new DomainError('Filtro inválido pois a data inicial é maior que a data final!');
            }
        }

        if (listSchedulingRequest.encerrado != null) {
            filterEncerrado = { equals: listSchedulingRequest.encerrado };
        }

        if (NonEmptyString.isEmpty(listSchedulingRequest.fk_lawyer)) {
            throw new DomainError('Necessário receber o id do advogado') 
        }
        
        filterLawyer = { equals: Number.parseInt(listSchedulingRequest.fk_lawyer) }        

        if (!NonEmptyString.isEmpty(listSchedulingRequest.area)) {
            filterArea = { equals: Number.parseInt(listSchedulingRequest.area) }
        }

        const schedulings = await prisma.agendamento.findMany({
            where: {
                fk_advogado: filterLawyer,
                data_agendamento: {
                    gte: filterDateInit,
                    lte: filterDateFinal
                },
                fk_advogado_area: filterArea,
                encerrado: filterEncerrado
            },
            orderBy: {
                data_agendamento: 'desc'
            }
        });

        return schedulings;
    }
}

export { ListSchedulingUseCaseLawyer }