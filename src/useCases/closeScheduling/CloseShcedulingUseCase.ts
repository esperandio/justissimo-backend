import { prisma } from "../../database";
import { DomainError, LawyerNotFoundError } from "../../errors";

interface ICloseSchedulingRequest {
    id_lawyer: number;
    id_scheduling: number;
}
class CloseSchedulingUseCase {
    async execute(closeSchedulingRequest: ICloseSchedulingRequest) {
        const advogado = await prisma.advogado.findFirst({
            where: {
                id_advogado: closeSchedulingRequest.id_lawyer
            }
        });

        if (!advogado) {
            throw new LawyerNotFoundError();
        }

        const schedulingAlreadyExists = await prisma.agendamento.findFirst({
            where: {
                id_agenda: closeSchedulingRequest.id_scheduling,
                fk_advogado: closeSchedulingRequest.id_lawyer
            }
        });

        if (!schedulingAlreadyExists) {
            throw new DomainError('Não foi possível excluir o agendamento pois o registro não existe ou já foi excluído!');
        }

        await prisma.agendamento.delete({
            where: {
                id_agenda: closeSchedulingRequest.id_scheduling
            }
        });
    }
}

export { CloseSchedulingUseCase }