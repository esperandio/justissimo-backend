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
        //Validando se é uma data válida
        let isValidDate = new Date(createSchedulingRequest.data_agendamento);
        let dateNow = new Date().setUTCHours(0,0,0,0);
        let dateNowConverted = new Date(dateNow).toLocaleDateString('pt-br');
        if (isNaN(isValidDate.getTime())) {
            throw new DomainError('Campo data inválido, esperado uma data válida, recebido: ' + createSchedulingRequest.data_agendamento);
        }

        console.log(new Date(dateNowConverted).valueOf());
        console.log(isValidDate.valueOf());

        if (isValidDate.valueOf() < (new Date(dateNow).valueOf())) {
            throw new DomainError('Campo data inválido, data inferior a data atual, recebido: ' + createSchedulingRequest.data_agendamento);
        }
        
        NonEmptyString.validate('causa', createSchedulingRequest.causa);
        HourSchedule.validate(createSchedulingRequest.horario);
        DaySchedule.validateDay(createSchedulingRequest.dia);
    }
}