import { json } from "express";
import { prisma } from "../../../database/index"

class ListClientByIdUseCase {
    async execute(id_client: number) {
        const client = await prisma.cliente.findUnique({
            where: {
                id_cliente: id_client,
            }
        });
            
        return client;
    }
}

export { ListClientByIdUseCase }