import { DomainError } from "../errors";
import { DaySchedule } from "./days-schedule";
import { HourSchedule } from "./hour-scheduling";
import { NonEmptyString } from "./non-empty-string";

interface ICreateSchedulingRequest {
    fk_advogado:        number;
    fk_cliente:         number;
    fk_advogado_area:   number;
    causa:              string;    
    data_agendamento:   string;
    duracao:            number;     
    horario:            string;  
    dia:                string;        
    observacao:         string;
}

export class ParmsScheduling {
    public static validate(createSchedulingRequest: ICreateSchedulingRequest): void {
        if ((isNaN(createSchedulingRequest.fk_advogado))    ||
        (isNaN(createSchedulingRequest.fk_advogado_area))   ||
        (isNaN(createSchedulingRequest.fk_cliente))         ||
        (isNaN(createSchedulingRequest.duracao))            ||
        (createSchedulingRequest.fk_advogado <= 0)          ||
        (createSchedulingRequest.fk_advogado_area <= 0)     ||
        (createSchedulingRequest.fk_cliente <= 0)                
        ) {
            throw new DomainError('Informações inválidas, por gentileza informe os dados corretamente!');
        }

        if (createSchedulingRequest.duracao < 30){
            throw new DomainError('Campo {duracao} inválido, por gentileza informe um valor igual ou maior que 30!');
        }
        
        //Validando se a data do agendamento é uma  data válida
        const concatDateScheduling = createSchedulingRequest.data_agendamento +"T" + createSchedulingRequest.horario+":00.000Z";
        let isValidDate = new Date(concatDateScheduling);
        let date = Date.now();

        //Convertendo para a data atual - brasilia
        const dateNowConverted = new Date(date).setHours(new Date(date).getUTCHours() - 6);          
             
        if (isNaN(isValidDate.getTime())) {
            throw new DomainError('Campo data inválido, esperado uma data válida, recebido: ' + createSchedulingRequest.data_agendamento);
        }

        //Validando se a data do agendamento é anterior a data atual
        if (isValidDate.getTime() < (new Date(dateNowConverted).getTime())) {
            throw new DomainError('Campo data ou horario inválido, data ou horário inferior a data atual, data e hora recebido: ' + createSchedulingRequest.data_agendamento   + ' - ' + createSchedulingRequest.horario);
        }
        
        NonEmptyString.validate('causa', createSchedulingRequest.causa);
        HourSchedule.validate(createSchedulingRequest.horario);
        DaySchedule.validateDay(createSchedulingRequest.dia);
    }
}