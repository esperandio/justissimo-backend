import { prisma } from "../../database";
import { ClientNotFoundError, DomainError, LawyerNotFoundError } from "../../errors";

interface IListCanEvaluateRequest {
    lawyer_id: string;
    client_id: string;
}

class ListCanEvaluateUseCase {
    async execute(listCanEvaluateRequest: IListCanEvaluateRequest) {
        if (Number.parseInt(listCanEvaluateRequest.lawyer_id) <= 0 || isNaN(Number.parseInt(listCanEvaluateRequest.lawyer_id))) {
            throw new DomainError("Id do advogado invalido!");
        }

        if (Number.parseInt(listCanEvaluateRequest.client_id) <= 0 || isNaN(Number.parseInt(listCanEvaluateRequest.client_id))) {
            throw new DomainError("Id do cliente invalido!");
        }

        const client = await prisma.cliente.findFirst({
            where: {
                id_cliente: Number.parseInt(listCanEvaluateRequest.client_id)
            },
        });

        if (!client){
            throw new ClientNotFoundError();
        }

        const lawyer = await prisma.advogado.findFirst({
            where: {
                id_advogado: Number.parseInt(listCanEvaluateRequest.lawyer_id)
            },
        });

        if (!lawyer){
            throw new LawyerNotFoundError();   
        }

        const canEvaluate = await prisma.podeAvaliar.findFirst({
            where: {
                fk_advogado: Number.parseInt(listCanEvaluateRequest.lawyer_id),
                fk_cliente: Number.parseInt(listCanEvaluateRequest.client_id)
            },
        });

        if (canEvaluate){
            return {pode_avaliar: true} 
        }

        return {pode_avaliar: false}
    }
}

export { ListCanEvaluateUseCase };