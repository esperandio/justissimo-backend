import { compare } from "bcryptjs"; 
import { sign } from "jsonwebtoken"; 
import { prisma } from "../../database/index";
import { Unauthorized } from "../../errors";

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
            throw new Unauthorized("Usuario ou senha incorreto!"); 
        }

        const passwordMath = await compare(password, userAlreadyExists.senha);
        if (!passwordMath) {
             throw new Unauthorized("Usuario ou senha incorreto!"); 
        }

        const token = sign({}, process.env.TOKEN_SECRET ?? "", {
            subject: userAlreadyExists.id_usuario.toString(),
            expiresIn : "120s",
        });

        return { token };
    }
}

export { AuthenticateUserUseCase }