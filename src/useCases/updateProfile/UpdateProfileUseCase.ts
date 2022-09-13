import { prisma } from "../../database/index"
import { DomainError, UserNotFoundError } from "../../errors";
import { Email, NonEmptyString, Password, PastDate } from "../../validators";

interface IUpdateProfileRequest {
    user_id: number;
    email: string;
    fullname: string;
    cnpj: string;
    cpf: string;
    birthday: string;
    city: string;
    state: string;
    zip_code: string;
    url_image: string;
}

class UpadateProfileUseCase {
    async execute(data: IUpdateProfileRequest) {

        const email = Email.validate(data.email).value;
        const fullname = NonEmptyString.validate('fullname', data.fullname).value;
        const city = NonEmptyString.validate('city', data.city).value;
        const zipcode = NonEmptyString.validate('zipcode', data.zip_code).value;
        const state = NonEmptyString.validate('state', data.state).value;
        const birthday = PastDate.validate(new Date(data.birthday)).value;
        let url_image = data.url_image;
        
        if ((data.cpf == "" && data.cnpj == "")
            || (data.cpf != "" && data.cnpj != "")
        ) {
            throw new DomainError("CPF e/ou CNPJ inválido(s)!");
        }
        
        const user = await prisma.usuario.findFirst({
            where: {
                id_usuario: data.user_id
            }
        });

        if (!user) {
            throw new UserNotFoundError();
        }

        if (url_image == "") {
            url_image = user.url_foto_perfil != "" ? user.url_foto_perfil : "";
        }

        if (user.tipo_usuario === 'advogado') {

            const lawyer = await prisma.advogado.update({
                where: {
                    fk_usuario: user.id_usuario,
                },
                include: {
                    usuario: true,
                },
                data: {
                    nome: fullname,
                    nr_cnpj: data.cnpj,
                    nr_cpf: data.cpf,
                    dt_nascimento: birthday,
                    usuario: {
                        update: {
                            url_foto_perfil: url_image,
                            email: email,
                        },
                    },
                    endereco: {
                        update: {
                            cidade: city,
                            estado: state,
                            nr_cep: zipcode,
                        },
                    },
                },
            });

            return lawyer;
        }

        if (user.tipo_usuario === 'cliente') {
            const client = await prisma.cliente.update({
                where: {
                    fk_usuario: user.id_usuario,
                },
                data: {
                    nome: fullname,
                    nr_cnpj: data.cnpj,
                    nr_cpf: data.cpf,
                    dt_nascimento: birthday,
                    usuario: {
                        update: {
                            url_foto_perfil: url_image,
                            email: email,
                        },
                    },
                    endereco: {
                        update: {
                            cidade: city,
                            estado: state,
                            nr_cep: zipcode,
                        },
                    },
                },
                include: {
                    usuario: {
                        select: {
                            email: true,
                            url_foto_perfil: true,
                        },
                    },
                    endereco: {
                        select: {
                            cidade: true,
                            estado: true,
                            nr_cep: true,
                        }
                    },
                },

            });
            
            return client;
        }
    }
}

export { UpadateProfileUseCase }