import { Request, Response } from "express";
import { PasswordRecoveryUseCase } from './PasswordRecoveryUseCase';

class PasswordRecoveryController {
    async handle(request: Request, response: Response) {
        const { 
            email
        } = request.body;

        const passwordRecovery = await new PasswordRecoveryUseCase().execute({ email })

        return response.status(200).json(passwordRecovery);
    }
}

export { PasswordRecoveryController }