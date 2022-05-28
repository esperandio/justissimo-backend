import { Request, Response } from "express";
import { ReviewLawyerUseCase } from "./ReviewLawyerUseCase";

class ReviewLawyerController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const { 
            id_cliente,
            descricao,
            nota
        } = request.body;

        await new ReviewLawyerUseCase().execute({
            client_id: id_cliente,
            lawyer_id: Number.parseInt(id),
            message: descricao,
            rate: nota
        });

        return response.status(200).json({message: "Avaliação feita com sucesso!"});
    }
}

export { ReviewLawyerController }