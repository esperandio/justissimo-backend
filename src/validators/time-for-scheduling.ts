import { DomainError } from "../errors";

class InvalidTimeForSchedulingError extends DomainError {
    constructor (hour: string) {
        super(`Não foi possivel realizar o agendamento : [${hour}]`)
    }
}
interface IScheduling {
    id_agenda: number;
    fk_advogado: number;
    fk_cliente: number;
    fk_advogado_area: number;
    causa: string;
    data_agendamento: Date;
    duracao: number;
    horario: Date;
    dia: string;
    observacao: string | null;
    contato_cliente: string;
    data_criacao_agendamento: Date;
}

export class TimeForScheduling {
    public static validate(schedulings: Array<IScheduling>, hour_init: Date, hour_final: Date, hour_scheduling: Date): boolean {
        
        // console.log(hour_scheduling)

        if (hour_scheduling.getTime() < hour_init.getTime()) {
            throw new DomainError("Error");
        }
    
        if (hour_scheduling.getTime() >= hour_final.getTime()) {
            throw new DomainError("Error");
        }
        
        // console.log(hour_scheduling)
        //Adicionando o tempo de duração ao tempo de inicio da consulta
        const dateCompare = hour_scheduling.setUTCMinutes(hour_scheduling.getUTCMinutes() + schedulings[0].duracao)
        console.log(new Date(dateCompare))
        if (new Date(dateCompare).getTime() > hour_final.getTime()) {
            throw new DomainError("Error");
        }

        //implementar for
        return true

    }
}