import { prisma } from "../../../database/index"
import { ClientNotFoundError } from '../../../errors'

class ListClientByIdUseCase {
    async execute(id_client: number) {
        const client = await prisma.cliente.findUnique({
            where: {
                id_cliente: id_client,
            },
            include: {
                usuario: {
                    select: {
                        email: true,
                        url_foto_perfil: true
                    }
                },

                endereco: true,
            },

        });

        if (client == null) {
            throw new ClientNotFoundError();
        }
            
        return client;
    }
}

export { ListClientByIdUseCase }