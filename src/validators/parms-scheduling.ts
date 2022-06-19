import { DomainError } from "../errors";
import { DateConvertedBr } from "./date-converted-br";
import { DaySchedule } from "./days-schedule";
import { HourSchedule } from "./hour-scheduling";
import { NonEmptyString } from "./non-empty-string";

interface ICreateSchedulingRequest {
    fk_advogado:        number;
    fk_cliente:         number;
    fk_advogado_area:   number;
    data_agendamento:   string;    
    horario:            string;  
    dia:                string;        
    observacao:         string;
}

export class ParmsScheduling {
    public static validate(createSchedulingRequest: ICreateSchedulingRequest): void {
        if ((isNaN(createSchedulingRequest.fk_advogado))    ||
        (isNaN(createSchedulingRequest.fk_advogado_area))   ||
        (isNaN(createSchedulingRequest.fk_cliente))         ||
        (createSchedulingRequest.fk_advogado <= 0)          ||
        (createSchedulingRequest.fk_advogado_area <= 0)     ||
        (createSchedulingRequest.fk_cliente <= 0)                
        ) {
            throw new DomainError('Informações inválidas, por gentileza informe os dados corretamente!');
        }
        
        //Validando se a data do agendamento é uma  data válida
        const concatDateScheduling = createSchedulingRequest.data_agendamento +"T" + createSchedulingRequest.horario+":00.000Z";
        let isValidDate = new Date(concatDateScheduling);
        let date = new Date().toLocaleString('pt-br');
        
        const dateNowConverted = DateConvertedBr.validate(date);            
             
        if (isNaN(isValidDate.getTime())) {
            throw new DomainError('Campo data inválido, esperado uma data válida, recebido: ' + createSchedulingRequest.data_agendamento);
        }

        //Validando se a data do agendamento é anterior a data atual
        if (isValidDate.getTime() < (new Date(dateNowConverted).getTime())) {
            throw new DomainError('Campo data ou horario inválido, data ou horário inferior a data atual, data e hora recebido: ' + createSchedulingRequest.data_agendamento   + ' - ' + createSchedulingRequest.horario);
        }

        HourSchedule.validate(createSchedulingRequest.horario);
    }
}