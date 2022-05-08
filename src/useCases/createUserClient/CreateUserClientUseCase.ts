import { prisma } from "../../database/index";
import { DomainError } from "../../errors";

interface IUserRequest {
    password: string;
    email: string;
    fullname: string;
    birthday: string;
    cpf: string;
    cnpj: string;
    city: string;
    state: string;
    zipcode: string;
}

interface IUserRespose {
    email: string;
    fullname: string;
}

class CreateUserClientUseCase {
    private validStates = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA', 
                           'PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',];

    async execute(userRequest : IUserRequest): Promise<IUserRespose> {
        if (
            userRequest.fullname == "" 
            || userRequest.city == "" 
            || userRequest.state == ""
            || !this.validStates.includes(userRequest.state)
            || userRequest.zipcode == ""
            || userRequest.birthday == ""
            || (
                (userRequest.cpf == "" && userRequest.cnpj == "")
                || (userRequest.cpf != "" && userRequest.cnpj != "")
            )
            || userRequest.email == ""
            || userRequest.password == ""
        ) {
            throw new DomainError("Informação inválida!");
        }

        const userAlreadExists = await prisma.usuario.findUnique({
            where: {
                email: userRequest.email
            }
        });

        if (userAlreadExists) {
            throw new DomainError("Usuário já existe!");
        }

        const usuario = await prisma.usuario.create({
            data: {
                email: userRequest.email,
                senha: userRequest.password
            }
        });

        const cliente = await prisma.cliente.create({
            data: {
                dt_nascimento: new Date(userRequest.birthday),
                nome: userRequest.fullname,
                nr_cnpj: userRequest.cnpj,
                nr_cpf: userRequest.cpf,
                fk_usuario: usuario.id_usuario
            }
        });

        const endereco = await prisma.endereco.create({
            data: {
                cidade: userRequest.city,
                estado: userRequest.state,
                nr_cep: userRequest.zipcode,
                fk_cliente: cliente.id_cliente
            }
        })

        return {
            email: usuario.email,
            fullname: cliente.nome
        }
    }
}

export { CreateUserClientUseCase }