
interface IUserRequest {
    fk_advogado: number;
    fk_cliente: number;
    fk_advogado_area: number;
    causa: string;    
    data_agendamento: string;
    duracao: number;     
    horario: string;  
    dia: string;        
    observacao: string;    
    contato_cliente: string;

}
class CreateSchedulingUseCase {
    async execute(userRequest: IUserRequest) {

    }
}

export { CreateSchedulingUseCase }