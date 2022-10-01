import { Request, Response} from "express";
import { ListMessageClientUseCase } from "./ListMessagesDivulgationClientUseCase";

class ListMessagesDivulgationController {

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    
    const messages = await new ListMessageClientUseCase().execute(id);

    return response.json(messages);
  }
}

export { ListMessagesDivulgationController }