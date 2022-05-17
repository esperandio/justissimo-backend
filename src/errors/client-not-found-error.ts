import { NotFoundError } from "./not-found-error"

export class ClientNotFoundError extends NotFoundError {
    constructor () {
        super("Cliente não encontrado.")
    }
}