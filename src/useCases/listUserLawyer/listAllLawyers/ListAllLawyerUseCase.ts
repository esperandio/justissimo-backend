import { Advogado } from "@prisma/client";
import { prisma } from "../../../database/index";
import { NonEmptyString } from "../../../validators";

interface IListRequest {
    name: string;
    city: string;
    state: string;
    rate: string;
    area: string;
}

class ListAllLawyersUseCase {
    async execute(listRequest: IListRequest): Promise<Advogado[]> {

        let filterName = {};
        let filterCity = {};
        let filterState = {};
        let filterRate = {};
        let filterArea = {};

        if (!NonEmptyString.isEmpty(listRequest.name)) {
            filterName = { contains: listRequest.name }
        }

        if (!NonEmptyString.isEmpty(listRequest.city)) {
            filterCity = { contains: listRequest.city, mode: 'insensitive' }
        }

        if (!NonEmptyString.isEmpty(listRequest.state)) {
            filterState = { equals: listRequest.state }
        }

        if (!NonEmptyString.isEmpty(listRequest.rate)) {
            filterRate = { equals: Number.parseInt(listRequest.rate) }
        }

        if (!NonEmptyString.isEmpty(listRequest.area)) {
            filterArea = { equals: Number.parseInt(listRequest.area) }
        }

        const advogados = await prisma.advogado.findMany({
            where: {
                nome: filterName,
                endereco: {
                    cidade: filterCity,
                    estado: filterState
                },
                nota: filterRate,
                areas: {
                    every: {
                        fk_area_atuacao: filterArea
                    }
                },
                autorizado: true
            },
            include: {
                endereco: true,
                _count: {
                    select: {
                        avaliacoes: true
                    }
                }
            }
        });
        return advogados;
    }
}

export { ListAllLawyersUseCase }