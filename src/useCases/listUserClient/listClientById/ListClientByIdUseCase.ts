import { json } from "express";
import { prisma } from "../../../database/index"

class ListClientByIdUseCase {
    async execute(id_client: string) {
    
        const client = await prisma.cliente.findUnique({
            where: {
                id_cliente: Number.parseInt(id_client),
            }
        });
            return client;
    }
}

export { ListClientByIdUseCase }