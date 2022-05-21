import { compare } from "bcryptjs"; 
import { sign } from "jsonwebtoken"; 
import { prisma } from "../../database/index";
import { UnauthorizedError } from "../../errors";

interface IRequest{
    email: string;
    password: string;
}

class AuthenticateUserUseCase {
    async execute({email, password} : IRequest) {

        const userAlreadyExists = await prisma.usuario.findFirst({
            where: {
                email,
            }
        });

        if (!userAlreadyExists) {
            throw new UnauthorizedError("Usuario ou senha incorreto!"); 
        }

        const passwordMath = await compare(password, userAlreadyExists.senha);
        if (!passwordMath) {
             throw new UnauthorizedError("Usuario ou senha incorreto!"); 
        }

        const token = sign({}, process.env.TOKEN_SECRET ?? "", {
            subject: userAlreadyExists.id_usuario.toString(),
            expiresIn : "3h",
        });

        return { token };
    }
}

export { AuthenticateUserUseCase }