import { Usuario } from "@prisma/client";
import { prisma } from "../../database";


class DeleteUserUseCase {
    async execute(id: string): Promise<void> {

        const userAlreadExists = await prisma.usuario.findUnique({
            where: {
               id_usuario: Number.parseInt(id),
            }
        });

        if (userAlreadExists == null) {
            throw new Error("Usuário não existe na base dados");
        }

        const deletedUser = await prisma.usuario.delete({
            where: {
               id_usuario: Number.parseInt(id),
            }
        });
    }
}

export { DeleteUserUseCase }