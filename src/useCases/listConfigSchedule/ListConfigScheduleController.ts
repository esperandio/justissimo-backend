import { Request, Response} from "express";
import { ListConfigScheduleUseCase } from "./ListConfigScheduleUseCase";

class ListConfigScheduleController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        
        const areas = await new ListConfigScheduleUseCase().execute(Number(id));

        return response.status(200).json(areas);
    }
}

export { ListConfigScheduleController }