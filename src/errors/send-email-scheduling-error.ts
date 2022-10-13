import { DomainError } from "./domain-error";

export class SendMailSchedulingError extends DomainError {
    constructor () {
        super("Ocorreu um erro ao encerrar o agendamento! Motivo: Erro ao enviar email de encerramento de agendamento.")
    }
}