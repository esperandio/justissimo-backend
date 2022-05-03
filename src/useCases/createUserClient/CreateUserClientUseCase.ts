
import { hashSync } from "bcryptjs";

// import { prisma } from "../../database";

interface IUserRequest {
    password: string;
    email: string;
    fullname: string;
    birthday: string;
    cpfCnpj: string;
    city: string;
    state: string;
    zipcode: string;
}

class CreateUserClientUseCase {
    private validStates = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA', 
                           'PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',];

    async execute(userRequest : IUserRequest) {
        if (
            userRequest.fullname == "" 
            || userRequest.city == "" 
            || userRequest.state == ""
            || !this.validStates.includes(userRequest.state)
            || userRequest.zipcode == ""
            || userRequest.birthday == ""
            || userRequest.cpfCnpj == ""
            || userRequest.email == ""
            || userRequest.password == ""
        ) {
            throw new Error("Informação inválido!");
        }
    }
}

export { CreateUserClientUseCase }