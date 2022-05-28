import { Request, Response} from "express";
import { CreateUserClientUseCase } from "./CreateUserClientUseCase";

class CreateUserClientController {
    async handle(request: Request, response: Response) {
        const { 
            senha,
            email,
            nome,
            dt_nascimento,
            cpf,
            cnpj,
            cidade,
            estado,
            cep 
        } = request.body;

        const userResponse = await new CreateUserClientUseCase().execute({
            password: senha,
            email,
            fullname: nome,
            birthday: dt_nascimento,
            cpf,
            cnpj,
            city: cidade,
            state: estado,
            zipcode: cep
        });

        return response.status(201).json(userResponse);
    }
}

export { CreateUserClientController }