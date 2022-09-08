import { DomainError } from "../errors";

class InvalidPasswordError extends DomainError {
    constructor () {
        super(`Informe uma senha que atenda ao seguinte padrão: \n
        - Possua no mínimo 8 caracteres \n
        - Pelo menos 1 caractere maiúsculo \n 
        - Pelo menos 1 caractere minúsculo \n 
        - Contenha 1 caractere especial \n 
        - Contenha 1 algarismo número.`)
    }
}

export class Password {
    private readonly _value: string

    constructor (password: string) {
        this._value = password
        Object.freeze(this)
    }

    public static validate(password: string): Password {
        const passwordReg = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/

        if (!passwordReg.test(password)) {
            throw new InvalidPasswordError()
        }

        return new Password(password)
    }

    public get value () {
        return this._value
    }
}