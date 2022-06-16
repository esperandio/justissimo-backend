import { prisma } from "../../database/index";
import { ClientNotFoundError, DomainError, AreaNotFoundError } from "../../errors";
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
        if (
            isNaN(reviewRequest.client_id)       || 
            isNaN(reviewRequest.area_atuacao_id) ||
            (reviewRequest.client_id <= 0)       ||
            (reviewRequest.area_atuacao_id <= 0) 
        ) {
            throw new DomainError('Atenção! Informe todos os dados!')
        }

        const client = await prisma.cliente.findUnique({
            where: {
                id_cliente: reviewRequest.client_id
            }
        });

        if (client == null) {
            throw new ClientNotFoundError();
        }

        const areaAtuacao = await prisma.areaAtuacao.findUnique({
            where: {
                id_area_atuacao: reviewRequest.area_atuacao_id
            }
        });

        if (areaAtuacao == null) {
            throw new AreaNotFoundError(reviewRequest.area_atuacao_id);
        }

        const divulgationExists = await prisma.divulgacao.findFirst({
            where: {
                fk_cliente: client.id_cliente,
                fk_area_atuacao: areaAtuacao.id_area_atuacao,
                encerrado: false
            }
        });

        if (divulgationExists != null) {
            throw new DomainError("Cliente já possui aberta uma divulgação para a área selecionada.");
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