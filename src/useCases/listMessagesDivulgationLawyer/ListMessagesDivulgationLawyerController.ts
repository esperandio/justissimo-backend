import { Request, Response} from "express";
import { ListMessagesDivulgationLawyerUseCase } from "./ListMessagensDivulgationLawyerUseCase";

class ListMessagesDivulgationLawyerController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { fk_advogado } = request.body;
        
        const messages = await new ListMessagesDivulgationLawyerUseCase().execute({ 
            id_divulgation: id,
            fk_lawyer: fk_advogado
        });

        return response.json(messages);
    }
}

export { ListMessagesDivulgationLawyerController }