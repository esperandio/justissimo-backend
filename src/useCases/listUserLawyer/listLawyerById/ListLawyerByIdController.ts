import { Request, Response } from "express";
import { ListLawyerByUseCase } from "./ListLawyerByIUseCase";

class ListLawyerByIdController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const lawyer = await new ListLawyerByUseCase().execute(Number.parseInt(id));

        return response.status(200).json(lawyer);
    }
}

export { ListLawyerByIdController }