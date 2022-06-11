import { json, Request, Response} from "express";
import { ConfigSchedulUseCase } from "./ConfigScheduleUseCase";

class ConfigScheduleController {
    async handle(request: Request, response: Response) {
        const dados = request.body;
        const config = await new ConfigSchedulUseCase().execute(dados);
        return response.status(200).json({});
    }
}

export { ConfigScheduleController }