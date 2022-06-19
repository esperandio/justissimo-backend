import { Request, Response } from 'express';
import { CloseSchedulingUseCase } from "./CloseShcedulingUseCase"

class CloseSchedulingController {
    async handle(request: Request, response: Response) {

        const {id_advogado, id_agenda} = request.body;

        await new CloseSchedulingUseCase().execute({
            id_lawyer: parseInt(id_advogado),
            id_scheduling: parseInt(id_agenda)
        });

        return response.status(200).json({message: "Registro excluído com sucesso"});
    }
}

export { CloseSchedulingController }