import { Request, Response} from "express";
import { ListAllClientsUseCase } from "./ListAllClientsUseCase";

class ListAllClientsController {
    async handle(request: Request, response: Response) {
        const useCase = new ListAllClientsUseCase();
        const clients = await useCase.execute();

        if (clients.length >= 1) {
            return response.status(200).json(clients);
        }
        return response.status(200).json({message: "Não foi localizado registros na base de dados"});
    }
}

export { ListAllClientsController }