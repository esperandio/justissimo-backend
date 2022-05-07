import { Request, Response } from "express"
import { ListClientByIdUseCase } from "./ListClientByIdUseCase"


class ListClientByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const client = await new ListClientByIdUseCase().execute(Number.parseInt(id));

        if (client == null) {
            return response.status(404).json({message: "Não foi localizado registro na base de dados"});
        }

        return response.status(200).json(client);
    }
}

export { ListClientByIdController }