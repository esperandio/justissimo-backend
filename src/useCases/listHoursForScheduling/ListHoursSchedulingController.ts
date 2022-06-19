import { Request, Response} from "express";
import { ListHoursForSchedulingUseCase } from "./ListHoursSchedulingUseCase";

class ListHoursForSchedulingController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const date_para_scheduling = request.query.data_para_agendamento as string;

        const hours_for_schedulings = await new ListHoursForSchedulingUseCase().execute({
            id_lawyer:  parseInt(id),
            date_for_scheduling: date_para_scheduling
        });
        
        return response.status(200).json(hours_for_schedulings);
    }
}

export { ListHoursForSchedulingController }