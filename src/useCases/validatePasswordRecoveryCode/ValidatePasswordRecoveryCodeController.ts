import { Request, Response } from "express";
import { ValidatePasswordRecoveryCodeUseCase } from "./ValidatePasswordRecoveryCodeUseCase";

class ValidatePasswordRecoveryCodeController {
    async handle(request: Request, response: Response) {
        const { codigo_recuperacao } = request.params;

        const valid = await new ValidatePasswordRecoveryCodeUseCase().execute({
            recoveryCode: codigo_recuperacao
        })

        if (!valid) {
            return response.status(404).json();    
        }

        return response.status(200).json();
    }
}

export { ValidatePasswordRecoveryCodeController }