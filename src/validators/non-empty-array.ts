import { DomainError } from "../errors";

class EmptyArrayError extends DomainError {
    constructor (field: string) {
        super(`Informe um array válido (campo: ${field}).`)
    }
}

export class NonEmptyArray<T> {
    private readonly _values: Array<T>;

    constructor (value: Array<T>) {
        this._values = value

        Object.freeze(this)
    }

    public static validate<T>(identifier: string, values: Array<T>): NonEmptyArray<T> {
        if (typeof values == 'undefined' || values.length <= 0) {
            throw new EmptyArrayError(identifier);
        }

        return new NonEmptyArray<T>(values);
    }

    public get values () {
        return this._values
    }
}