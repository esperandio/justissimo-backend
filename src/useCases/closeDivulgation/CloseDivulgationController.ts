import { Request, Response } from 'express';
import { CloseDivulgationUseCase } from './CloseDivulgationUseCase';

class CloseDivulgationController {
    async handle(request: Request, response: Response) {
        
        const { id_divulgacao } = request.params;
        const { id_usuario } = request.body;

        await new CloseDivulgationUseCase().execute({
            id_user: id_usuario,
            id_divulgation: id_divulgacao
        });

        return response.status(200).json({message: "Divulgação encerrada com sucesso!"});
    }
}

export { CloseDivulgationController }