import { Advogado } from "@prisma/client";
import { prisma } from "../../../database/index"
import { NotFoundError } from '../../../errors'

class ListLawyerByUseCase {
    async execute(id_lawyer: number) : Promise<Advogado> {
        const advogado = await prisma.advogado.findUnique({
            where: {
                id_advogado: id_lawyer,
            },
            include: {
                usuario: {
                    select: {
                        email: true
                    }
                },
                _count: {
                    select: {
                        avaliacoes: true
                    }
                }
            }
        });

        if (advogado == null) {
            throw new NotFoundError("Advogado não encontrado.");
        }
            
        return advogado;
    }
}

export { ListLawyerByUseCase }