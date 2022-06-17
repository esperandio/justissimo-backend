import { Request, Response} from "express";
import { ListAllLawyersUseCase } from "./ListAllLawyerUseCase";
 
class ListAllLawyersController {
    async handle(request: Request, response: Response) {
        const nome = request.query.nome as string;
        const cidade = request.query.cidade as string;
        const estado = request.query.estado as string;
        const nota = request.query.nota as string;
        const area = request.query.area as string;

        const advogados = await new ListAllLawyersUseCase().execute({
            name: nome,
            city: cidade,
            state: estado,
            rate: nota,
            area
        });

        return response.status(200).json(advogados);
    }
}

export { ListAllLawyersController }