import { DomainError } from "../errors";

class InvalidDateError extends DomainError {
    constructor (date: Date) {
        super(`Informe uma data válida (valor informado: ${date.toDateString()}).`)
    }
}

export class PastDate {
    private readonly _value: Date

    constructor (date: Date) {
        this._value = date
        Object.freeze(this)
    }

    public static validate(date: Date): PastDate {
        const today = new Date();

        if (date.getDate() >= today.getDate()) {
            throw new InvalidDateError(date);
        }

        return new PastDate(date);
    }

    public get value () {
        return this._value
    }
}