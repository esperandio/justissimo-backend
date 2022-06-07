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

        const userClient = await prisma.cliente.findUnique({
            where:{
                fk_usuario: userAlreadyExists.id_usuario
            }
        });

        const token = sign({}, process.env.TOKEN_SECRET ?? "", {
            subject: userAlreadyExists.id_usuario.toString(),
            expiresIn : "3h",
        });

        if (userClient) {
            const tipo_usuario = "Cliente";
            const id_cliente = userClient.id_cliente;
            return { token, tipo_usuario, id_cliente };
        }
        else {
            const userLawyer = await prisma.advogado.findUnique({
                where:{
                    fk_usuario: userAlreadyExists.id_usuario
                }
            });

            if (userLawyer) {
                const tipo_usuario = "Advogado";
                const id_advogado = userLawyer.id_advogado;
                return { token, tipo_usuario, id_advogado };
            }
            else {
                throw new UnauthorizedError("Usuario ou senha incorreto!");
            }
        }
    }
}

export { AuthenticateUserUseCase }