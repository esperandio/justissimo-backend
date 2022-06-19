import { Request, Response} from "express";
import { ListSchedulingUseCaseClient } from "./ListSchedulingUseCaseClient";

class ListSchedulingControllerClient {
    async handle(request: Request, response: Response) {
        const date_init   = request.query.date_init as string;
        const date_final = request.query.date_final as string;
        const area = request.query.area as string;
        const { id } = request.params;
        
        const schedulings = await new ListSchedulingUseCaseClient().execute({
            fk_client: id,
            date_init,
            date_final,
            area
        });

        return response.status(200).json(schedulings);
    }
}

export { ListSchedulingControllerClient }