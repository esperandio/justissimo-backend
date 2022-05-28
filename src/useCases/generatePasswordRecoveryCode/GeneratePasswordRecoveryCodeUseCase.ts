import { prisma } from "../../database"
import { mail } from "../../mail"
import { UserNotFoundError } from "../../errors"
import { Email } from "../../validators"
import { randomBytes } from 'crypto'

interface IPasswordRecoveryRequest {
    email: string
}

interface IPasswordRecoveryResponse {
    codigo_recuperacao: string
}

class GeneratePasswordRecoveryCodeUseCase {
    async execute(passwordRecoveryRequest: IPasswordRecoveryRequest): Promise<IPasswordRecoveryResponse> {
        const email = Email.validate(passwordRecoveryRequest.email)

        const usuario = await prisma.usuario.findUnique({
            where: {
                email: email.value
            }
        });

        if (usuario == null) {
            throw new UserNotFoundError()
        }

        const codigo_recuperacao = this.getNewRecoveryCode()

        mail.sendEmail({
            from: process.env.SMTP_AUTH_USER ?? "",
            html: `<p>Código de recuperação: ${codigo_recuperacao}</p>`,
            subject: "Recuperação de senha",
            to: email.value
        })

        const dataExpiracao = new Date()
        dataExpiracao.setMinutes(dataExpiracao.getMinutes() + 30)

        await prisma.recuperacaoSenha.create({
            data: {
                fk_usuario: usuario.id_usuario,
                codigo_recuperacao: codigo_recuperacao,
                dt_expiracao: dataExpiracao
            }
        })

        return { codigo_recuperacao }
    }

    private getNewRecoveryCode(): string {
        return randomBytes(8).toString('hex');
    }
}

export { GeneratePasswordRecoveryCodeUseCase }