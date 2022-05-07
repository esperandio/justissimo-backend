import { Request, Response} from "express";
import { CreateUserClientUseCase } from "./CreateUserClientUseCase";

class CreateUserClientController {
    async handle(request: Request, response: Response) {
        const { 
            password,
            email,
            fullname,
            birthday,
            cpf,
            cnpj,
            city,
            state,
            zipcode 
        } = request.body;

        const userResponse = await new CreateUserClientUseCase().execute({
            password,
            email,
            fullname,
            birthday,
            cpf,
            cnpj,
            city,
            state,
            zipcode 
        });

        return response.status(201).json(userResponse);
    }
}

export { CreateUserClientController }