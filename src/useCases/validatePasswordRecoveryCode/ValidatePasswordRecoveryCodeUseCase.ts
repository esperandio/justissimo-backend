import { prisma } from "../../database"

interface IValidatePasswordRecoveryCodeRequest {
    recoveryCode: string
}

class ValidatePasswordRecoveryCodeUseCase {
    async execute(request: IValidatePasswordRecoveryCodeRequest): Promise<Boolean> {
        const recuperacaoSenha = await prisma.recuperacaoSenha.findFirst({
            where: {
                codigo_recuperacao: request.recoveryCode
            }
        })

        if (recuperacaoSenha == null) {
            return false;
        }

        return true;
    }
}

export { ValidatePasswordRecoveryCodeUseCase }