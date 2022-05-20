import { prisma } from "../../database"
import { mail } from "../../mail"
import { UserNotFoundError } from "../../errors"
import { Email } from "../../validators"
import { randomBytes } from 'crypto'

interface IPasswordRecoveryRequest {
    email: string
}

interface IPasswordRecoveryResponse {
    recovery_code: string
}

class PasswordRecoveryUseCase {
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

        const recovery_code = this.getNewRecoveryCode()

        mail.sendEmail({
            from: process.env.SMTP_AUTH_USER ?? "",
            html: `<p>Código de recuperação: ${recovery_code}</p>`,
            subject: "Recuperação de senha",
            to: email.value
        })

        await prisma.recuperacaoSenha.create({
            data: {
                fk_usuario: usuario.id_usuario,
                codigo_recuperacao: recovery_code
            }
        })

        return { recovery_code }
    }

    private getNewRecoveryCode(): string {
        return randomBytes(8).toString('hex');
    }
}

export { PasswordRecoveryUseCase }