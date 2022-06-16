import { DomainError } from "../errors";

class InvalidHourError extends DomainError {
    constructor (hour: string) {
        super(`Campo Hora inválido, foi informado um valor incorreto: [${hour}]`)
    }
}
export class HourSchedule {
    public static validate(hour: string): Date {
        var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(hour);

        if (!isValid) {
            throw new InvalidHourError(hour);
        } 

        return new Date("0001-01-01T" + hour + ":00.000Z");
    }
}