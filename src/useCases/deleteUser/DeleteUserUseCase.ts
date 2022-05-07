import { Usuario } from "@prisma/client";
import { prisma } from "../../database";


class DeleteUserUseCase {
    async execute(id: number): Promise<void> {
        const userAlreadExists = await prisma.usuario.findUnique({
            where: {
               id_usuario: id,
            }
        });

        if (userAlreadExists == null) {
            throw new Error("Usuário não existe na base dados");
        }

        await prisma.usuario.delete({
            where: {
               id_usuario: id,
            }
        });
    }
}

export { DeleteUserUseCase }