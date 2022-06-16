import { Request, Response} from "express";
import { CreateSchedulingUseCase } from "./CreateSchedulingUseCase";

class CreateSchedulingController {
    async handle(request: Request, response: Response) {
        const {
            fk_advogado,
            fk_cliente,
            fk_advogado_area,
            causa,
            data_agendamento,
            duracao,
            horario,
            dia,
            observacao 
        } = request.body;

        await new CreateSchedulingUseCase().execute({
            fk_advogado,
            fk_cliente,
            fk_advogado_area,
            causa,
            data_agendamento,
            duracao,
            horario,
            dia,
            observacao 
        });

        return response.status(201).json({message: "Agendamento cadastrado com sucesso!"});
    }
}

export { CreateSchedulingController }