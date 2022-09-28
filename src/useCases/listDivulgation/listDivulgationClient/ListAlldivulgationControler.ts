import { Request, Response} from "express";
import { ListAllDivulgationUseCase } from "./ListAllDivulgationUseCase";


class ListAllDivulgationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data_inicial   = request.query.data_inicial as string;
    const data_final = request.query.data_final as string;
    const area = request.query.area as string;
    const { id } = request.params;

    const divulgations =  await new ListAllDivulgationUseCase().execute({
        date_init: data_inicial,
        date_final: data_final,
        area,
        fk_client: id
      });
      
      return response.status(200).json(divulgations);

  }
}

export { ListAllDivulgationController };