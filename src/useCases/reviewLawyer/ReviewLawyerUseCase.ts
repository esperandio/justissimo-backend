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
        const advogado = await prisma.advogado.findUnique({
            where: {
               id_advogado: reviewRequest.lawyer_id,
            }
        });

        if (advogado == null) {
            throw new LawyerNotFoundError();
        }

        const cliente = await prisma.cliente.findUnique({
            where: {
                id_cliente: reviewRequest.client_id
            }
        });

        if (cliente == null) {
            throw new ClientNotFoundError();
        }

        const rate = Rate.validate(reviewRequest.rate);
        const message = reviewRequest.message;

        const avaliacaoJaExistente =  await prisma.avaliacao.findFirst({
            where: {
                fk_cliente: cliente.id_cliente,
                fk_advogado: advogado.id_advogado
            }
        });

        if (avaliacaoJaExistente != null) {
            await prisma.avaliacao.update({
                where: {
                    id_avaliacao: avaliacaoJaExistente.id_avaliacao
                },
                data: {
                    nota: rate.value,
                    descricao: message
                }
            });

            return;
        }

        await prisma.avaliacao.create({
            data: {
                fk_cliente: cliente.id_cliente,
                fk_advogado: advogado.id_advogado,
                nota: rate.value,
                descricao: message
            }
        });
    }
}

export { ReviewLawyerUseCase }