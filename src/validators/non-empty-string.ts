import { DomainError } from "../errors";

class EmptyStringError extends DomainError {
    constructor (field: string) {
        super(`Informe uma string válida (campo: ${field}).`)
    }
}

export class NonEmptyString {
    private readonly _value: string

    constructor (value: string) {
        this._value = value

        Object.freeze(this)
    }

    public static validate(identifier: string, value: string): NonEmptyString {
        if (this.isEmpty(value)) {
            throw new EmptyStringError(identifier);
        }

        return new NonEmptyString(value);
    }

    public static isEmpty(value: string): Boolean
    {
        return value == "" || value == undefined || value == null;
    }

    public get value () {
        return this._value
    }
}