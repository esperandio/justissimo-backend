import { prisma } from "../../database";
import { DomainError } from "../../errors";
import { DivulgationNotFoundError } from "../../errors/divulgation-not-found-error";
import { NonEmptyString } from "../../validators";
import { DateConvertedBr } from "../../validators/date-converted-br";

interface ICloseDivulgationRequest {
    id_divulgation: string;
    id_user: string;
}

class CloseDivulgationUseCase {
    async execute(closeDivulgationRequest: ICloseDivulgationRequest) {
        const id_divulgation = NonEmptyString.validate("id_divulgacao", closeDivulgationRequest.id_divulgation).value;
        const id_user = NonEmptyString.validate("id_usuario", closeDivulgationRequest.id_user).value;

        if (Number.parseInt(id_divulgation) <= 0) {
            throw new DomainError("Id da divulgação invalido!");
        }

        if (Number.parseInt(id_user) <= 0) {
            throw new DomainError("Id do usuário invalido!");
        }

        const userExists = await prisma.usuario.findUnique({
            where: {
                id_usuario: Number.parseInt(id_user)
            },
            include: {
                cliente: true
            }
        });

        if (!userExists) {
            throw new DomainError("Usuário não encontrado!");
        }

        const divulgationExists = await prisma.divulgacao.findUnique({
            where: {
                id_divulgacao: Number.parseInt(id_divulgation)
            }
        });

        if (!divulgationExists) {
            throw new DivulgationNotFoundError();
        }
    
        if (divulgationExists.encerrado) {
            throw new DomainError("Não foi possíve encerrar a divulgação pois ela já está encerrada!");
        }
        
        if (userExists.cliente) {
            if (divulgationExists.fk_cliente !== userExists.cliente.id_cliente) {
                throw new DomainError("Usuário não está vinculado a esta divulgação!");
            }

            await prisma.divulgacao.update({
                where: {
                    id_divulgacao: Number.parseInt(id_divulgation)
                },
                data: {
                    encerrado: true,
                    dt_encerramento: DateConvertedBr.validate(new Date().toLocaleString())
                }
            });

            return;
        }

        throw new DomainError("O usuário não têm permissão para encerrar a divulgação pois não esta cadastrado como cliente!");
    }
}

export { CloseDivulgationUseCase }