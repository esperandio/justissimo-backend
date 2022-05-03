import { Request, Response} from "express";
import { CreateUserClientUseCase } from "./CreateUserClientUseCase";

class CreateUserClientController {
    async handle(request: Request, response: Response) {
        const { 
            password,
            email,
            fullname,
            birthday,
            cpfCnpj,
            city,
            state,
            zipcode 
        } = request.body;

        const useCase = new CreateUserClientUseCase();

        try {
            await useCase.execute(
                {
                    password,
                    email,
                    fullname,
                    birthday,
                    cpfCnpj,
                    city,
                    state,
                    zipcode 
                }
            )
            
        } catch (error) {                        
            return response.status(404).json('erro');
        }

        return response.status(200).json('sucesso');
    }
}

export { CreateUserClientController }