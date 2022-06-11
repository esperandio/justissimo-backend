import { DomainError } from "../errors";

class InvalidTimeError extends DomainError {
    constructor (data: String) {
        super(`Informe um horário válido (valores informados: ${data}).`)
    }
}

export class TimeSchedule {
    private readonly _valueInit: Date
    private readonly _valuefinal: Date

    constructor (date_init: Date, date_final: Date) {
        this._valueInit = date_init;
        this._valuefinal = date_final;
        Object.freeze(this);
    }

    public static validate(date_init: Date, date_final: Date): TimeSchedule {

        if ((date_final.getUTCHours() < date_init.getUTCHours()) ||
            (date_final.getTime() == date_init.getTime())        ||
            (date_init.getUTCHours() == 0) 
            ) {
            throw new InvalidTimeError( "inicial: " + date_init.getUTCHours().toString() +
                                        ":" + date_init.getUTCMinutes()                  +
                                        ", final: " + date_final.getUTCHours()           +   
                                        ":" + date_final.getUTCMinutes());
        }

        return new TimeSchedule(date_init, date_final);
    }

    public get valueInit () {
        return this._valueInit
    }
    public get valueFinal () {
        return this._valuefinal
    }
}