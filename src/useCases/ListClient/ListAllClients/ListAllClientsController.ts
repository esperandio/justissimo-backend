import { Request, Response} from "express";
import { ListAllClientsUseCase } from "./ListAllClientsUseCase";

class ListAllClientsController {
    async handle(request: Request, response: Response) {
        const useCase = new ListAllClientsUseCase();

        const resp = useCase.execute();

        return response.status(200).json(resp);
    }
}

export { ListAllClientsController }