import { prisma } from "../../database/index";
import { LawyerNotFoundError } from "../../errors";
import { NonEmptyString } from "../../validators";

interface IUserRequest {
    fk_advogado: number;
    dia: string;
    hora_inicio: string;
    hora_final: string;
    duracao: number;
}

class ConfigSchedulUseCase {
    async execute(userRequest : Array<IUserRequest>) {

        for (let value of userRequest.values()) {
            const dia = NonEmptyString.validate('dia', value.dia);
            const hora_inicio = NonEmptyString.validate('hora_inicio', value.hora_inicio);
            const hora_final =  NonEmptyString.validate('hora_final', value.hora_final);

            const userExists = await prisma.advogado.findUnique({
                where: {
                    id_advogado: value.fk_advogado
                }
            });

            if (userExists == null) {
                throw new LawyerNotFoundError();
            }

        }


        
    }
}

export { ConfigSchedulUseCase }