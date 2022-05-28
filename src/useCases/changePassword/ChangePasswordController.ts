import { Request, Response } from 'express';
import { ChangePasswordUseCase } from './ChangePasswordUseCase';

class ChangePasswordController {
    async handle(request: Request, response: Response) {
        const { 
            email,
            codigo_recuperacao,
            nova_senha
        } = request.body;
        await new ChangePasswordUseCase().execute({ 
            email, 
            recovery_code: codigo_recuperacao, 
            new_password: nova_senha
        });

        return response.status(200).json();
    }
}

export { ChangePasswordController }