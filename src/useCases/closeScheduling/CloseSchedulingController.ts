import { Request, Response } from 'express';
import { CloseSchedulingUseCaseLawyer } from "./CloseShcedulingUseCase"

class CloseSchedulingControllerLawyer {
    async handle(request: Request, response: Response) {

        const { id_agendamento } = request.params;
        const { justificativa, motivo, id_usuario } = request.body;

        await new CloseSchedulingUseCaseLawyer().execute({
            id_scheduling: id_agendamento,
            jsutification: justificativa,
            reason: motivo,
            id_user: id_usuario
        });

        return response.status(200).json({message: "Registro excluído com sucesso"});
    }
}

export { CloseSchedulingControllerLawyer }