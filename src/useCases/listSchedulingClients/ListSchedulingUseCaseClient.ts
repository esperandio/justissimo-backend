import { Agendamento } from "@prisma/client";
import { prisma } from "../../database";
import { DomainError } from "../../errors";
import { NonEmptyString } from "../../validators";

interface IListSchedulingRequest{
    fk_client: string;
    date_init: string;
    date_final: string;
    area: string;
}

class ListSchedulingUseCaseClient {
    async execute(listSchedulingRequest: IListSchedulingRequest) {
        let filterDateInit  = new Date(-8640000000000);
        let filterDateFinal = new Date(8640000000000);
        let filterLawyer = {};
        let filterArea = {};

        if (!NonEmptyString.isEmpty(listSchedulingRequest.date_init)) {
            filterDateInit = new Date(listSchedulingRequest.date_init  + "T00:00:00.000Z");
        }

        if (!NonEmptyString.isEmpty(listSchedulingRequest.date_final)) {
            filterDateFinal = new Date(listSchedulingRequest.date_final + "T00:00:00.000Z");
        }
        
        if (isNaN(filterDateInit.getTime())) {
            throw new DomainError('Campo data_inicial inválido, esperado uma data válida, recebido: ' + listSchedulingRequest.date_init);
        }

        if (isNaN(filterDateFinal.getTime())) {
            throw new DomainError('Campo data_final inválido, esperado uma data válida, recebido: ' + listSchedulingRequest.date_final);
        }

        if (filterDateInit.getTime() > filterDateFinal.getTime()) {
            throw new DomainError('Filtro inválido pois a data inicial é maior que a data final!');
        }

        if (NonEmptyString.isEmpty(listSchedulingRequest.fk_client)) {
            throw new DomainError('Necessário receber o id do cliente') 
        }
        
        filterLawyer = { equals: Number.parseInt(listSchedulingRequest.fk_client) }        

        if (!NonEmptyString.isEmpty(listSchedulingRequest.area)) {
            filterArea = { equals: Number.parseInt(listSchedulingRequest.area) }
        }

        const schedulings = await prisma.agendamento.findMany({
            where: {
                fk_cliente: filterLawyer,
                data_agendamento: {
                    gte: filterDateInit,
                    lte: filterDateFinal
                },
                fk_advogado_area: filterArea
            },
            select: {
                id_agenda: true,
                fk_advogado: true,
                fk_cliente: true,
                fk_advogado_area: true,
                data_agendamento: true,
                duracao: true,
                horario: true,
                observacao: true,
                area_atuacao: true,
                data_criacao_agendamento: true,
                encerrado: true,
                advogado:{
                    select: {
                        nome: true,
                        nr_cna: true,
                        nr_cnpj: true,
                        nr_cpf: true,
                        tel_celular: true,
                        endereco: {
                            select: {
                                logradouro: true,
                                numero: true,
                                nr_cep: true,
                                cidade: true,
                                estado: true,
                            }
                        }
                    }
                },
            },
            

        });

        return schedulings;
    }
}

export { ListSchedulingUseCaseClient }