import { prisma } from '../../database';
import { Password } from '../../validators';
import { hash } from 'bcryptjs';
import { DomainError } from '../../errors';

interface IChangePasswordRequest {
    email: string;
    recovery_code: string;
    new_password: string;
}

class ChangePasswordUseCase {
    async execute(changePasswordRequest: IChangePasswordRequest): Promise<void> {
        const password = Password.validate(changePasswordRequest.new_password);

        const recuperacaoSenha = await prisma.recuperacaoSenha.findFirst({
            where: {
                usuario: {
                    email: changePasswordRequest.email
                },
                codigo_recuperacao: changePasswordRequest.recovery_code,
                dt_expiracao: {
                    gte: new Date()
                }
            }
        });

        if (recuperacaoSenha == null) {
            throw new DomainError("Código de recuperação inválido.");
        }

        const passwordHash = await hash(password.value, 8);

        await prisma.usuario.update({
            where: {
                email: changePasswordRequest.email
            },
            data: {
                senha: passwordHash
            }
        });

        await prisma.recuperacaoSenha.delete({
            where: { 
                id_recuperacao_senha: recuperacaoSenha.id_recuperacao_senha 
            }
        });
    }
}

export { ChangePasswordUseCase }