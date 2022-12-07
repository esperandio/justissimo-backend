import { Request, Response} from "express";
import { ListCanEvaluateUseCase } from "./ListCanEvaluateUseCase";

class ListCanEvaluateController {
    async handle(request: Request, response: Response) {
        const { fk_advogado, fk_cliente } = request.body;
        
        const podeAvaliar = await new ListCanEvaluateUseCase().execute({
            lawyer_id: fk_advogado,
            client_id: fk_cliente
        });

        return response.json(podeAvaliar);
    }
}

export { ListCanEvaluateController };