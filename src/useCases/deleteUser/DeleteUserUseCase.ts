import { prisma } from "../../database";
import { UserNotFoundError } from "../../errors/user-not-found-error";


class DeleteUserUseCase {
    async execute(id: number): Promise<void> {
        const userAlreadExists = await prisma.usuario.findUnique({
            where: {
               id_usuario: id,
            }
        });

        if (userAlreadExists == null) {
            throw new UserNotFoundError();
        }

        await prisma.usuario.delete({
            where: {
               id_usuario: id,
            }
        });
    }
}

export { DeleteUserUseCase }