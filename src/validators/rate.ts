import { DomainError } from "../errors";

class InvalidRateError extends DomainError {
    constructor (rate: number) {
        super(`Informe uma avaliação válida (valor informado: ${rate}).`)
    }
}

export class Rate {
    private readonly _value: number

    constructor (rate: number) {
        this._value = rate
        Object.freeze(this)
    }

    public static validate(rate: number): Rate {
        if (
            (rate == undefined || rate == null)
            || (rate < 0 || rate > 5)
        ) {
            throw new InvalidRateError(rate);
        }

        return new Rate(rate);
    }

    public get value () {
        return this._value
    }
}