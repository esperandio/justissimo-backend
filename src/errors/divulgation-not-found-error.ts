import { NotFoundError } from "./not-found-error"

export class DivulgationNotFoundError extends NotFoundError {
    constructor () {
        super("Divulgação não encontrada no sistema.")
    }
}