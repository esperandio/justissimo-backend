
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
    private validStates = ['SC', 'PR'];

    async execute(userRequest : IUserRequest) {
        if (
            userRequest.fullname == "" 
            || userRequest.city == "" 
            || userRequest.state == ""
            || !this.validStates.includes(userRequest.state)
        ) {
            throw new Error("Informação inválido!");
        }
    }
}

export { CreateUserClientUseCase }