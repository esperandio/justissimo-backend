import { Request, Response } from 'express';
import { CreateDivulgationUseCase } from "./CreateDivulgationUseCase";

class CreateDivulgationController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const { 
            titulo,
            descricao,
            id_area_atuacao
        } = request.body;

        const divulgationResponse = await new CreateDivulgationUseCase().execute({
            client_id: Number.parseInt(id),
            title: titulo,
            description: descricao,
            area_atuacao_id: id_area_atuacao
        });

        return response.status(201).json(divulgationResponse);
    }
}

export { CreateDivulgationController }