import { Request, Response } from "express";
import { GeneratePasswordRecoveryCodeUseCase } from './GeneratePasswordRecoveryCodeUseCase';

class GeneratePasswordRecoveryCodeController {
    async handle(request: Request, response: Response) {
        const { 
            email
        } = request.body;

        const passwordRecovery = await new GeneratePasswordRecoveryCodeUseCase().execute({ email })

        return response.status(200).json(passwordRecovery);
    }
}

export { GeneratePasswordRecoveryCodeController }