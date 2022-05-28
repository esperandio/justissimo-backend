import { Advogado } from "@prisma/client";
import { prisma } from "../../../database/index";
import { NonEmptyString } from "../../../validators";

interface IListRequest {
    name: string;
    city: string;
    state: string;
    rate: string;
}

class ListAllLawyersUseCase {
    async execute(listRequest: IListRequest): Promise<Advogado[]> {

        let filterName = {};
        let filterCity = {};
        let filterState = {};
        let filterRate = {};

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

        const advogados = await prisma.advogado.findMany({
            where: {
                nome: filterName,
                endereco: {
                    cidade: filterCity,
                    estado: filterState
                },
                nota: filterRate
            },
            include: {
                endereco: true
            }
        });
        return advogados;
    }
}

export { ListAllLawyersUseCase }