import { Request, Response } from 'express';
import { CloseSchedulingUseCase } from "./CloseShcedulingUseCase"

class CloseSchedulingController {
    async handle(request: Request, response: Response) {

        const { id_agendamento } = request.params;
        const { justificativa, motivo, id_usuario } = request.body;

        await new CloseSchedulingUseCase().execute({
            id_scheduling: id_agendamento,
            justification: justificativa,
            reason: motivo,
            id_user: id_usuario
        });

        return response.status(200).json({message: "Agendamento encerrado com sucesso!"});
    }
}

export { CloseSchedulingController }