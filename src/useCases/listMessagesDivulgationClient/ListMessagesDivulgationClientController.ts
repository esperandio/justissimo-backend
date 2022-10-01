import { Request, Response} from "express";
import { ListMessageClientUseCase } from "./ListMessagesDivulgationClientUseCase";

class ListMessagesDivulgationController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id, fk_cliente } = request.params;
    
    const messages = await new ListMessageClientUseCase().execute({
        id_divulgation: id,
        fk_client: fk_cliente
    });

    return response.json(messages);
  }
}

export { ListMessagesDivulgationController }