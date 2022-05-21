import { Request, Response } from "express";
import { ValidatePasswordRecoveryCodeUseCase } from "./ValidatePasswordRecoveryCodeUseCase";

class ValidatePasswordRecoveryCodeController {
    async handle(request: Request, response: Response) {
        const { recoveryCode } = request.params;

        const valid = await new ValidatePasswordRecoveryCodeUseCase().execute({recoveryCode})

        if (!valid) {
            return response.status(404).json();    
        }

        return response.status(200).json();
    }
}

export { ValidatePasswordRecoveryCodeController }