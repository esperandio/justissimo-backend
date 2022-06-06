import { DomainError } from "../errors";

class InvalidDurationError extends DomainError {
    constructor (durations: number[]) {
        super(`Campo DURACAO inválido, foi informado um valor menor que 30 min : [${durations}]`)
    }
}
export class DurationSchedule {
    public static validate(durations: number[]): boolean {
        durations.map((value) => {
            if (value < 30) {
                throw new InvalidDurationError(durations);
            }
        });

        return true;
    }
}