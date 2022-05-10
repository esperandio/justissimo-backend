import { hash} from "bcryptjs";
import { Advogado } from "@prisma/client";
import { prisma } from "../../database/index";
import { DomainError } from "../../errors";
import { Email, NonEmptyString, PastDate, Password } from "../../validators";

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
}

class CreateUserAdvogateUseCase {
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
            throw new DomainError("Usuário já existe!");
        }

        const passwordHash = await hash(password.value, 8);

        const usuario = await prisma.usuario.create({
            data: {
                email: email.value,
                senha: passwordHash
            }
        });

        const advogado = await prisma.advogado.create({
            data: {
                dt_nascimento: birthday.value,
                nome: fullname.value,
                nr_cnpj: userRequest.cnpj,
                nr_cpf: userRequest.cpf,
                fk_usuario: usuario.id_usuario,
                nr_cna: register_cna.value,
                uf_cna: userRequest.state_cna,
                tel_celular: phone.value
            }
        });

        await prisma.endereco.create({
            data: {
                cidade: city.value,
                estado: state.value,
                nr_cep: zipcode.value,
                fk_cliente: advogado.id_advogado
            }
        });

        return advogado;
    }
}

export { CreateUserAdvogateUseCase }