import { Request, Response } from 'express';
import { ChangePasswordUseCase } from './ChangePasswordUseCase';

class ChangePasswordController {
    async handle(request: Request, response: Response) {
        const { 
            email,
            recovery_code,
            new_password
        } = request.body;

        await new ChangePasswordUseCase().execute({ email, recovery_code, new_password });

        return response.status(200).json();
    }
}

export { ChangePasswordController }