import { prisma } from "../../database/index";
import { ClientNotFoundError, DomainError } from "../../errors";
import { NonEmptyString } from "../../validators";
import { Divulgacao } from "@prisma/client";

interface ICreateDivulgationRequest {
    client_id: number;
    title: string;
    description: string;
    area_atuacao_id: number;
}

class CreateDivulgationUseCase {
    async execute(reviewRequest: ICreateDivulgationRequest): Promise<Divulgacao> {
        const client = await prisma.cliente.findUnique({
            where: {
                id_cliente: reviewRequest.client_id
            }
        })

        if (client == null) {
            throw new ClientNotFoundError();
        }

        const areaAtuacao = await prisma.areaAtuacao.findUnique({
            where: {
                id_area_atuacao: reviewRequest.area_atuacao_id
            }
        });

        if (areaAtuacao == null) {
            throw new DomainError("Área de atuação não encontrada");
        }

        const title = NonEmptyString.validate("titulo", reviewRequest.title);

        const divulgation = await prisma.divulgacao.create({
            data: {
                fk_cliente: client.id_cliente,
                fk_area_atuacao: areaAtuacao.id_area_atuacao,
                titulo: title.value,
                descricao: reviewRequest.description
            }
        });

        return divulgation;
    }
}

export { CreateDivulgationUseCase }