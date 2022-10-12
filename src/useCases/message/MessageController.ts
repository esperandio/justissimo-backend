import { Request, Response } from 'express';
import { MessageUseCase } from './MessageUseCase';

class MessageController {
    async handle(request: Request, response: Response) {
        const { id_usuario } = request.params;
        const { mensagem, fk_advogado } = request.body;

        await new MessageUseCase().execute({
            id_user: id_usuario,
            message: mensagem,
            fk_lawyer:  fk_advogado,
        });

        return response.status(200).json({message: "Mensagem enviada com sucesso!"});
    }
}

export { MessageController };