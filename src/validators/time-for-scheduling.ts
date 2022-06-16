import { DomainError } from "../errors";

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
    public static validate(schedulings: Array<IScheduling>, hour_init: Date, hour_final: Date, hour_scheduling: Date, duration: number): boolean {   
        if ((hour_scheduling.getTime() < hour_init.getTime())   ||
            (hour_scheduling.getTime() > hour_final.getTime()))     {
            throw new DomainError('Não foi possivel cadastrar o agendameto pois o advogado não atende no horario informado!');
        }
        
        //Adicionando o tempo de duração ao tempo de inicio da consulta a ser agendada
        const cloneHourScheduling = new Date(hour_scheduling.getTime());
        const dateCompare = new Date(cloneHourScheduling.setUTCMinutes(cloneHourScheduling.getUTCMinutes() + duration));

        if (dateCompare.getTime() > hour_final.getTime()) {
            throw new DomainError('Não foi possivel cadastrar o agendameto pois o horario informado ultrapassa o período de atendimento do advogado!');
        }

        for (let value of schedulings.values()) {
            const hour_init_scheduling = new Date(value.horario.getTime());
            const hour_final_scheduling = new Date(value.horario.setUTCMinutes(value.horario.getUTCMinutes() + value.duracao));

            if ((hour_scheduling.getTime() > hour_init_scheduling.getTime()) && (hour_scheduling.getTime() < hour_final_scheduling.getTime())) {
                throw new DomainError('Não foi possivel cadastrar o agendameto pois já existe um agendamento no horário solicitado');
            }

            const schedulingsDuration = new Date(hour_scheduling.setUTCMinutes(hour_scheduling.getUTCMinutes() + duration));
            
            if ((schedulingsDuration.getTime() > hour_init_scheduling.getTime()) && (schedulingsDuration.getTime() < hour_final_scheduling.getTime())) {
                throw new DomainError('Não foi possivel cadastrar o agendameto pois já existe um agendamento no horário solicitado');
            }
        }
        return true
    }
}