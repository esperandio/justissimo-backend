import { DomainError } from "../errors";

class InvalidDayError extends DomainError {
    constructor () {
        super('Campo DIA inválido (informe um dos valores: SEGUNDA, TERCA, QUARTA, QUINTA ou SEXTA).')
    }
}

class InvalidDayDuplicateError extends DomainError {
    constructor (days: string[]) {
        super(`Campo DIA inválido, foi informado dois ou mais dias repetidos: [${days}]`)
    }
}

function checkIfDuplicateExists(arr: string[]) {
    return new Set(arr).size !== arr.length
}

export class DaySchedule {
    constructor (day: string[]) {
        Object.freeze(this);
    }

    public static validate(days: string[]): boolean {
        const daysCompare = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA'];

        if (checkIfDuplicateExists(days)) {
            throw new InvalidDayDuplicateError(days);
        }

        days.map((value) => {
            if (!daysCompare.includes(value.toUpperCase())) {
                throw new InvalidDayError();
            }
        });

        return true;
    }
}