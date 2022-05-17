import { prisma } from "../../database";
import { LawyerNotFoundError, ClientNotFoundError } from "../../errors";
import { Rate } from "../../validators";

interface IReviewRequest {
    lawyer_id: number;
    client_id: number;
    rate: number;
    message: string;
}

class ReviewLawyerUseCase {
    async execute(reviewRequest: IReviewRequest): Promise<void> {
        const lawyer = await prisma.advogado.findUnique({
            where: {
               id_advogado: reviewRequest.lawyer_id,
            }
        });

        if (lawyer == null) {
            throw new LawyerNotFoundError();
        }

        const client = await prisma.cliente.findUnique({
            where: {
                id_cliente: reviewRequest.client_id
            }
        })

        if (client == null) {
            throw new ClientNotFoundError();
        }

        const rate = Rate.validate(reviewRequest.rate);
        const message = reviewRequest.message;

        await prisma.avaliacao.create({
            data: {
                fk_cliente: client.id_cliente,
                fk_advogado: lawyer.id_advogado,
                nota: rate.value,
                descricao: message
            }
        })
    }
}

export { ReviewLawyerUseCase }