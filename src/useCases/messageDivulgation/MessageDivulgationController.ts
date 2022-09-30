import { Request, Response } from "express";
import { MessageDivulgationUseCase } from "./MessageDivulgationUseCase";

class MessageDivulgationController {

    async handle(request: Request, response: Response) {
        const { id } = request.params;
    
        const { 
            id_divulgacao,
            mensagem
        } = request.body;

        await new MessageDivulgationUseCase().execute({
            fk_lawyer: id,
            fk_divulgation: id_divulgacao,
            message: mensagem
        });

        return response.status(200).json({message: "Mensagem enviada com sucesso!"});
    }
  
}

export { MessageDivulgationController };