import { prisma } from "../../../database";
import { DomainError } from "../../../errors";
import { NonEmptyString } from "../../../validators";

interface IListDivulgationRequest{
    date_init: string;
    date_final: string;
    area: string;
}

class ListAllDivulgationUseCase {
  async execute(listDivulgationRequest: IListDivulgationRequest) {
    let filterDateInit  = new Date(-8640000000000);
    let filterDateFinal = new Date(8640000000000);
    let filterArea = {};

    if (!NonEmptyString.isEmpty(listDivulgationRequest.date_init)) {
        filterDateInit = new Date(listDivulgationRequest.date_init  + "T00:00:00.000Z");
    }
    
    if (!NonEmptyString.isEmpty(listDivulgationRequest.date_final)) {
        filterDateFinal = new Date(listDivulgationRequest.date_final + "T23:59:59.000Z");
    }
    
    if (isNaN(filterDateInit.getTime())) {
        throw new DomainError('Campo data_inicial inválido, esperado uma data válida, recebido: ' + listDivulgationRequest.date_init);
    }

    if (isNaN(filterDateFinal.getTime())) {
        throw new DomainError('Campo data_final inválido, esperado uma data válida, recebido: ' + listDivulgationRequest.date_final);
    }

    if (filterDateInit.getTime() > filterDateFinal.getTime()) {
        throw new DomainError('Filtro inválido pois a data inicial é maior que a data final!');
    }    

    if (isNaN(filterDateFinal.getTime())) {
        throw new DomainError('Campo data_final inválido, esperado uma data válida, recebido: ' + listDivulgationRequest.date_final);
    }

    if (filterDateInit.getTime() > filterDateFinal.getTime()) {
        throw new DomainError('Filtro inválido pois a data inicial é maior que a data final!');
    }    

    if (!NonEmptyString.isEmpty(listDivulgationRequest.area)) {
        filterArea = { equals: Number.parseInt(listDivulgationRequest.area) }
    }

    const divulgations = await prisma.divulgacao.findMany({
        
        where:{
            encerrado: false,
            dt_cadastro: {
                gte: filterDateInit,
                lte: filterDateFinal
            },
            fk_area_atuacao: filterArea
        },
        include: {
            cliente: {
                select: {
                    nome: true,
                    usuario: {
                        select: {
                            url_foto_perfil: true,
                        }
                    }
                }
            },
            areaAtuacao: {
                select: {
                    titulo: true,
                }
            }
        },
        orderBy: {
            dt_cadastro: 'desc'
        }
    });

    return divulgations;
  }
}

export { ListAllDivulgationUseCase };