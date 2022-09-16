import { Request, Response} from "express";
import { CreateManualSchedulingUseCase } from "./CreateManualSchedulingUseCase";

class CreateManualSchedulingController {
    async handle(request: Request, response: Response) {
        const {
            fk_advogado,
            fk_advogado_area,
            data_agendamento,
            nome_cliente,
            email_cliente,
            horario,
            dia,
            observacao 
        } = request.body;

        await new CreateManualSchedulingUseCase().execute({
            fk_advogado,
            fk_advogado_area,
            data_agendamento,
            nome_cliente,
            email_cliente,
            horario,
            dia,
            observacao
        });

        return response.status(201).json({message: "Agendamento cadastrado com sucesso!"});
    }
}

export { CreateManualSchedulingController }