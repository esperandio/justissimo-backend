import { Request, Response } from 'express';
import { ListPendingLawyersuseCase } from './ListPendingLawyersUseCase';

class ListPendingLawyersController {
    async handle(request: Request, response: Response) {
        const  id_usuario = request.query.id_usuario as string;
        
        const pendingLawyers = await new ListPendingLawyersuseCase().execute(id_usuario);

        return response.status(200).json(pendingLawyers);
    }
}

export { ListPendingLawyersController }