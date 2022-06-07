import { AreaAtuacao } from "@prisma/client";
import { prisma } from "../../database/index"

class ListAllAreasUseCase {
    async execute(): Promise<AreaAtuacao[]> { 
        const areas = await prisma.areaAtuacao.findMany();
        return areas;
    }   
}

export { ListAllAreasUseCase }