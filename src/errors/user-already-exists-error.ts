import { DomainError } from "./domain-error"

export class UserAlreadyExistsError extends DomainError {
    constructor (email: string) {
        super(`Usuário já existe (email: ${email}).`)
    }
}