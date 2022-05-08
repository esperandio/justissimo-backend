import { DomainError } from "../errors";

class InvalidPasswordError extends DomainError {
    constructor (passwordReg: RegExp) {
        super(`Informe uma senha que atenda ao seguinte padrão: ${passwordReg}.`)
    }
}

export class Password {
    private readonly _value: string

    constructor (password: string) {
        this._value = password
        Object.freeze(this)
    }

    public static create(password: string): Password {
        const passwordReg = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/

        if (!passwordReg.test(password)) {
            throw new InvalidPasswordError(passwordReg)
        }

        return new Password(password)
    }

    public get value () {
        return this._value
    }
}