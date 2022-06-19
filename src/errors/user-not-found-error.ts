import { NotFoundError } from "./not-found-error"

export class UserNotFoundError extends NotFoundError {
    constructor () {
        super("Usuário não encontrado.")
    }
}