import { Request, Response} from "express";
import { ListAllDivulgationUseCase } from "./ListAllDivulgationUseCase";


class ListAllDivulgationController {

  async handle(request: Request, response: Response): Promise<Response> {
      const divulgations =  await new ListAllDivulgationUseCase().execute();
      return response.status(200).json(divulgations);

  }
}

export { ListAllDivulgationController };