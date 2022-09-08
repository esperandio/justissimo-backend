import { prisma } from "../../database/index"
import { UserNotFoundError } from "../../errors";


class ListUserProfileUseCase {
    async execute(id_client: number, type_user: string) {

        const types = ["advogado", "cliente"];
        
        if (!types.includes(type_user)) {
            throw new UserNotFoundError();
        }

        if (type_user == "advogado") {
            const lawyer = await prisma.advogado.findFirst({
                where: {
                    id_advogado: id_client
                },
                include: {
                    usuario: {
                        select: {
                            email: true,
                            url_foto_perfil: true
                        }
                    },
                    areas: {
                        select: {
                            areaAtuacao: true
                        }
                    },
                    endereco: true,
                },
            });
        
            if (lawyer == null) {
                throw new UserNotFoundError();
            }
            else {
                return lawyer;
            }
        }
        else {
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
                throw new UserNotFoundError();
            }
            else {
                return client;
            }
        }
    }
}

export { ListUserProfileUseCase }