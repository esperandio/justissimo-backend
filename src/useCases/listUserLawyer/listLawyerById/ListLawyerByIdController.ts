import { Request, Response } from "express";
import { ListLawyerByIdUseCase } from "./ListLawyerByIdUseCase";

class ListLawyerByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const lawyer = await new ListLawyerByIdUseCase().execute(Number.parseInt(id));

        return response.status(200).json(lawyer);
    }
}

export { ListLawyerByIdController }