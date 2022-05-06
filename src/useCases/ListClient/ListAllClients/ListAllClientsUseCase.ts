import { prisma } from "../../../database/index"

interface IClientRespose {
    email: string;
    fullname: string;
}

class ListAllClientsUseCase {
    async execute(): Promise<JSON> {

        // Implementar a Autenticacao:
        
        const clients = await prisma.cliente.findMany();

        return JSON.parse(clients.toString());
        // return {
        //     email: "",
        //     fullname:""
        // }
    }   
}

export { ListAllClientsUseCase }