import { hash } from "bcryptjs";
import { Advogado } from "@prisma/client";
import { prisma } from "../../database/index";
import { DomainError, UserAlreadyExistsError, AreaNotFoundError } from "../../errors";
import { Email, NonEmptyString, PastDate, Password, NonEmptyArray } from "../../validators";

interface IUserRequest {
    password: string;
    email: string;
    fullname: string;
    birthday: string;
    cpf: string;
    cnpj: string;
    city: string;
    state: string;
    zipcode: string;
    register_cna: string;
    state_cna: string;
    phone: string;
    areas: Array<number>;
    info: string;
    url_image: string;
}

class CreateUserLawyerUseCase {
    private validStates = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
        'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',];

    async execute(userRequest: IUserRequest): Promise<Advogado> {
        const email = Email.validate(userRequest.email);
        const fullname = NonEmptyString.validate('fullname', userRequest.fullname);
        const city = NonEmptyString.validate('city', userRequest.city);
        const zipcode = NonEmptyString.validate('zipcode', userRequest.zipcode);
        const state = NonEmptyString.validate('state', userRequest.state);
        const birthday = PastDate.validate(new Date(userRequest.birthday));
        const password = Password.validate(userRequest.password);
        const register_cna = NonEmptyString.validate('register_cna', userRequest.register_cna);
        const phone = NonEmptyString.validate('phone', userRequest.phone);
        const areas = NonEmptyArray.validate('areas', userRequest.areas);
        const info = NonEmptyString.validate('info', userRequest.info);
        const url_image = userRequest.url_image;

        const passwordHash = await hash(password.value, 8);

        if (!this.validStates.includes(state.value) || !this.validStates.includes(state.value)) {
            throw new DomainError(`Estado inválido. Valor informado: ${state.value}. Valores possíveis: ${this.validStates.toString()}`);
        }

        if (
            (userRequest.cpf == "" && userRequest.cnpj == "")
            || (userRequest.cpf != "" && userRequest.cnpj != "")
        ) {
            throw new DomainError("CPF e/ou CNPJ inválido(s)!");
        }

        const userAlreadExists = await prisma.usuario.findUnique({
            where: {
                email: email.value
            }
        });

        if (userAlreadExists) {
            throw new UserAlreadyExistsError(email.value);
        }

        const areasAtuacao = await Promise.all(
            areas.values.map(
                async (x) => {
                    const area = await prisma.areaAtuacao.findUnique({
                        where: {
                            id_area_atuacao: x
                        }
                    });
    
                    if (area == null) {
                        throw new AreaNotFoundError(x);
                    }
    
                    return area;
                }
            )
        );

        // Cria usuário
        const usuario = await prisma.usuario.create({
            data: {
                email: email.value,
                senha: passwordHash,
                url_foto_perfil: url_image,
            }
        });

        // Cria advogado
        const advogado = await prisma.advogado.create({
            data: {
                dt_nascimento: birthday.value,
                nome: fullname.value,
                nr_cnpj: userRequest.cnpj,
                nr_cpf: userRequest.cpf,
                fk_usuario: usuario.id_usuario,
                nr_cna: register_cna.value,
                uf_cna: userRequest.state_cna,
                tel_celular: phone.value,
                info: info.value
            }
        });

        // Cria endereço
        await prisma.endereco.create({
            data: {
                cidade: city.value,
                estado: state.value,
                nr_cep: zipcode.value,
                fk_advogado: advogado.id_advogado
            }
        });

        // Cria áreas de atuação
        await prisma.advogadoArea.createMany({
            data: areasAtuacao.map(x => { 
                return { fk_advogado: advogado.id_advogado, fk_area_atuacao: x.id_area_atuacao }
            })
        });

        return advogado;
    }
}

export { CreateUserLawyerUseCase }