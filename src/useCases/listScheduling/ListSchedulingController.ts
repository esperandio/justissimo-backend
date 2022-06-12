import { Request, Response} from "express";
import { ListSchedulingUseCase } from "./ListSchedulingUseCase";

class ListSchedulingController {
    async handle(request: Request, response: Response) {
        const nome = request.query.nome as string;
        const cidade = request.query.cidade as string;
        const estado = request.query.estado as string;
        const nota = request.query.nota as string;

        const schedulings = await new ListSchedulingUseCase().execute({});
    }
}

export { ListSchedulingController }