import { Request, Response } from 'express';
import { ReproveLawyerUseCase } from './ReproveLawyerUseCase';

class ReproveLawyerController {
    async handle(request: Request, response: Response) {
        const { id_usuario, id_advogado, aprovado } = request.body;

        await new ReproveLawyerUseCase().execute({
            id_user: id_usuario,
            id_lawyer: id_advogado
        });

        return response.status(200).json({ message: "Cadastro reprovado com sucesso!" });
    }
}

export { ReproveLawyerController }