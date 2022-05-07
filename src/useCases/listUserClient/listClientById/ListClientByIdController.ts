import { Request, Response } from "express"
import { ListClientByIdUseCase } from "./ListClientByIdUseCase"


class ListClientByIdController {
    
    async handle(request: Request, response: Response) {
        const useCase =  new ListClientByIdUseCase;
        const { id } = request.params;
        const client = await useCase.execute(id);

        if (client != null) {
            return response.status(200).json(client);
        }
        return response.status(200).json({message: "Não foi localizado registro na base de dados"});
    }
}

export { ListClientByIdController }