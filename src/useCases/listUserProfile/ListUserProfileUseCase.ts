import { prisma } from "../../database/index"
import { UserNotFoundError } from "../../errors";

class ListUserProfileUseCase {
    async execute(user_id: number) {
        const user = await prisma.usuario.findFirst({
            where: {
                id_usuario: user_id
            }
        });
        
        if (!user) {
            throw new UserNotFoundError();
        }
        
        if(user.tipo_usuario === 'advogado') {
            const lawyer = await prisma.advogado.findFirst({
                where: {
                    fk_usuario: user.id_usuario,
                },
                select: {
                    nome: true,
                    nr_cnpj: true,
                    nr_cpf: true,
                    dt_nascimento: true,
                    endereco: {
                        select: {
                            cidade: true,
                            estado: true,
                            nr_cep: true,
                        }
                    },
                    usuario: {
                        select: {
                                url_foto_perfil: true
                            }
                        }
                    },
            });
        
            if (lawyer == null) {
                throw new UserNotFoundError();
            }
            else {
                return lawyer;
            }
        }

        else if (user.tipo_usuario == "cliente") {
            const client = await prisma.cliente.findUnique({
                where: {
                    fk_usuario: user.id_usuario,
                },
                select: {
                    nome: true,
                    nr_cnpj: true,
                    nr_cpf: true,
                    dt_nascimento: true,
                    endereco: {
                        select: {
                            cidade: true,
                            estado: true,
                            nr_cep: true,
                        }
                    },
                    usuario: {
                        select: {
                                url_foto_perfil: true
                            }
                        }
                    },
            });
            
            if (client == null) {
                throw new UserNotFoundError();
            }
            else {
                return client;
            }
        }
        else {
            throw new UserNotFoundError();
        }
    }
}

export { ListUserProfileUseCase }