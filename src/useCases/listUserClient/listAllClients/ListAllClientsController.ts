import { Request, Response} from "express";
import { ListAllClientsUseCase } from "./ListAllClientsUseCase";

class ListAllClientsController {
    async handle(request: Request, response: Response) {
        const clients = await new ListAllClientsUseCase().execute();

        return response.status(200).json(clients);
    }
}

export { ListAllClientsController }