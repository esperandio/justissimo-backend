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
    nome_cliente:       string;
    email_cliente:      string;    
    horario:            string;  
    dia:                string;        
    observacao:         string;
}

interface ICreateManualSchedulingRequest {
    fk_advogado:        number;
    fk_advogado_area:   number;
    data_agendamento:   string;
    nome_cliente:       string;
    email_cliente:      string;    
    horario:            string;  
    dia:                string;        
    observacao:         string;
}

export class ParmsScheduling {
    public static validate(createSchedulingRequest: any, manual: Boolean): void {

        if (manual) {
            const createManualSchedulingRequest = createSchedulingRequest as ICreateManualSchedulingRequest;
            
            if ((isNaN(createManualSchedulingRequest.fk_advogado))       ||
               (isNaN(createManualSchedulingRequest.fk_advogado_area))   ||
               (createManualSchedulingRequest.fk_advogado <= 0)          ||
               (createManualSchedulingRequest.fk_advogado_area <= 0)     ||
               (createManualSchedulingRequest.data_agendamento == "")    ||
               (createManualSchedulingRequest.nome_cliente == "")        ||
               (createManualSchedulingRequest.email_cliente == "")) {
                
                throw new DomainError('Informações inválidas, por gentileza informe os dados corretamente!');
            }
        }
        else{
            const createClientSchedulingRequest = createSchedulingRequest as ICreateSchedulingRequest;
            
            if ((isNaN(createClientSchedulingRequest.fk_advogado))    ||
               (isNaN(createClientSchedulingRequest.fk_advogado_area))   ||
               (isNaN(createClientSchedulingRequest.fk_cliente))         ||
               (createClientSchedulingRequest.fk_advogado <= 0)          ||
               (createClientSchedulingRequest.fk_advogado_area <= 0)     ||
               (createClientSchedulingRequest.fk_cliente <= 0)                
            ) {
                throw new DomainError('Informações inválidas, por gentileza informe os dados corretamente!');
            }
        }
        
        if (createSchedulingRequest.observacao.length > 200) {
            throw new DomainError("Campo obsevacao invalido, quantidade de caracteres ultrapassa (200)!");
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