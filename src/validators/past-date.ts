import { DomainError } from "../errors";
import { DateConvertedBr } from "./date-converted-br";

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
        let today = new Date().toLocaleString('pt-br');
        
        const dateNowConverted = DateConvertedBr.validate(today); 

        if (date.getTime() >= dateNowConverted.getTime()) {
            throw new InvalidDateError(date);
        }

        return new PastDate(date);
    }

    public get value () {
        return this._value
    }
}