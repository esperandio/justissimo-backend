import { Request, Response } from "express";
import { ReviewLawyerUseCase } from "./ReviewLawyerUseCase";

class ReviewLawyerController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const { 
            client_id,
            message,
            rate
        } = request.body;

        await new ReviewLawyerUseCase().execute({
            client_id: client_id,
            lawyer_id: Number.parseInt(id),
            message: message,
            rate: rate
        });

        return response.status(200).json({message: "Avaliação feita com sucesso!"});
    }
}

export { ReviewLawyerController }