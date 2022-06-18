interface ISchedulings {
    id_agenda: number;
    fk_advogado: number;
    fk_cliente: number;
    fk_advogado_area: number;
    causa: string;
    data_agendamento: Date;
    duracao: number;
    horario: Date;
    observacao: string | null;
    contato_cliente: string;
    data_criacao_agendamento: Date;
}

export class AvailableHoursForScheduling {
    public static validate(schedulings: Array<ISchedulings>, hour_init: Date, hour_final: Date, date_for_scheduling: Date, duration: number): Array<String> {
        let arrayHours: Array<string> = []

        //Horarios que não devem ser retornados pois já estão agendados
        const hoursRemove = schedulings.map((x)  => (x.horario.getUTCHours() +':'+ (x.horario.getUTCMinutes() == 0 ? "00": x.horario.getUTCMinutes())));

        let hourInsertArray = new Date(hour_init.getTime());
        console.log(hour_init, hourInsertArray)
        for (let index = 0; hourInsertArray.getTime() < hour_final.getTime(); index++) {
            arrayHours.push(hourInsertArray.getUTCHours() +':'+ (hourInsertArray.getUTCMinutes() == 0 ? "00": hourInsertArray.getUTCMinutes())); 
            hourInsertArray =  new Date(hourInsertArray.setUTCMinutes(hourInsertArray.getUTCMinutes() + duration));
        }

        const  hoursForSchedulingValids = arrayHours.filter((item) => {
                if (!hoursRemove.includes(item)) {
                    return item;
                }
        });

        return hoursForSchedulingValids;
    }
}