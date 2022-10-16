import { prisma } from "../../database";
import { DomainError } from "../../errors";
import { NonEmptyString } from "../../validators";

class ListPendingLawyersuseCase {
    async execute(id: string) {
        
        const id_user = Number.parseInt(NonEmptyString.validate("id_user", id).value);

        if (id_user <= 0) {
            throw new DomainError("Id do usuário inválido!");
        }

        const user = await prisma.usuario.findFirst({
            where: {
                id_usuario: id_user,
                tipo_usuario: "administrador",
            },
        });


        if (!user) {
            throw new DomainError("Usuário não existe ou não é um administrador!");
        }

        const pendingLawyers = await prisma.advogado.findMany({
            where: {
                autorizado: false,
                dt_reprovacao: null,
            },
            select: {
                id_advogado: true,
                nome: true,
                nr_cna: true,
                uf_cna: true,

                usuario: {
                    select: {
                        id_usuario: true,
                        url_foto_perfil: true
                    },
                }
            }
        });

        return pendingLawyers;
    }
}

export { ListPendingLawyersuseCase }