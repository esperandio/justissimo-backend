import { Cliente } from "@prisma/client";
import { prisma } from "../../../database/index"

class ListAllClientsUseCase {
    async execute(): Promise<Cliente[]> { 
        const clients = await prisma.cliente.findMany();
        return clients;
    }   
}

export { ListAllClientsUseCase }