import { prisma } from "../../database"

interface IValidatePasswordRecoveryCodeRequest {
    recoveryCode: string
}

class ValidatePasswordRecoveryCodeUseCase {
    async execute(request: IValidatePasswordRecoveryCodeRequest): Promise<Boolean> {
        const recuperacaoSenha = await prisma.recuperacaoSenha.findFirst({
            where: {
                codigo_recuperacao: request.recoveryCode,
                dt_expiracao: {
                    gte: new Date()
                }
            }
        })

        if (recuperacaoSenha == null) {
            return false;
        }

        return true;
    }
}

export { ValidatePasswordRecoveryCodeUseCase }