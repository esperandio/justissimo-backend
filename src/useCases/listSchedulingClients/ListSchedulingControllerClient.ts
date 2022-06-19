import { Request, Response} from "express";
import { ListSchedulingUseCaseClient } from "./ListSchedulingUseCaseClient";

class ListSchedulingControllerClient {
    async handle(request: Request, response: Response) {
        const data_inicial   = request.query.data_inicial as string;
        const data_final = request.query.data_final as string;
        const area = request.query.area as string;
        const { id } = request.params;
        
        const schedulings = await new ListSchedulingUseCaseClient().execute({
            fk_client: id,
            date_init: data_inicial,
            date_final: data_final,
            area
        });

        return response.status(200).json(schedulings);
    }
}

export { ListSchedulingControllerClient }