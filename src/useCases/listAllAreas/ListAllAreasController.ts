import { Request, Response} from "express";
import { ListAllAreasUseCase } from "./ListAllAreasUseCase";

class ListAllAreasController {
    async handle(request: Request, response: Response) {
        const areas = await new ListAllAreasUseCase().execute();

        return response.status(200).json(areas);
    }
}

export { ListAllAreasController }