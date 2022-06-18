import { DomainError } from "../errors";

class InvalidDateError extends DomainError {
    constructor () {
        super(`Ocorreu um erro ao validar a data atual.`)
    }
}

export class DateConvertedBr {
    /**Converte a data atual (default) em data atual do Brasil */
    public static validate(date: string): Date {
        let dateArray = date.split(' ');
    
        let dateArrayWithoutHour = dateArray[0].split('/');
        dateArray[0] = dateArrayWithoutHour[2] + '-' + dateArrayWithoutHour[1] + '-' + dateArrayWithoutHour[0];
    
        let dateValid = new Date(dateArray[0] + 'T' + dateArray[1] + '.000Z');
        
        if (!dateValid) {
            throw new InvalidDateError();
        } 

        return dateValid
    }
        /**Retorna variavel do tipo Date apenas com o dia, mes e ano.*/
        public static getDatewhitoutHours(date: string): Date {
            let dateArray = date.split(' ');
            let dateArrayWithoutHour = dateArray[0].split('/');
            
            dateArray[0] = dateArrayWithoutHour[2] + '-' + dateArrayWithoutHour[1] + '-' + dateArrayWithoutHour[0];
            let dateValid = new Date(dateArray[0] +"T00:00:00.000Z");
            
            if (!dateValid) {
                throw new InvalidDateError();
            } 
    
            return dateValid
        }
}