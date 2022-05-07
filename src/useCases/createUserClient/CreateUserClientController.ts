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

        const useCase = new CreateUserClientUseCase();
        const resp = await useCase.execute(
            {
                password,
                email,
                fullname,
                birthday,
                cpf,
                cnpj,
                city,
                state,
                zipcode 
            }
        );

        return response.status(200).json(resp);
    }
}

export { CreateUserClientController }