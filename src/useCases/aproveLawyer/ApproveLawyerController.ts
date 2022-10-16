import { Request, Response } from 'express';
import { ApproveLawyerUseCase } from './ApproveLawyerUseCase';

class ApproveLawyerController {
    async handle(request: Request, response: Response) {
        const { id_usuario, id_advogado, aprovado } = request.body;

        const aproveLawyer = await new ApproveLawyerUseCase().execute({
            id_user: id_usuario,
            id_lawyer: id_advogado,
            aprove: aprovado,
        });

        return response.status(200).json({ message: aproveLawyer });
    }
}

export { ApproveLawyerController }