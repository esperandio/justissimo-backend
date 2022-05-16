import { Advogado, Cliente } from "@prisma/client";
import { prisma } from "../../../database/index"

class ListAllLawyersUseCase {
    async execute(): Promise<Advogado[]> {
        const advogados = await prisma.advogado.findMany();
        return advogados;
    }
}

export { ListAllLawyersUseCase }