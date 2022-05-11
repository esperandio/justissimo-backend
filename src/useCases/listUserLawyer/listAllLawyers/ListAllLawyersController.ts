import { Request, Response} from "express";
import { ListAllLawyersUseCase } from "./ListAllLawyerUseCase";

class ListAllLawyersController {
    async handle(request: Request, response: Response) {
        const advogados = await new ListAllLawyersUseCase().execute();

        return response.status(200).json(advogados);
    }
}

export { ListAllLawyersController }