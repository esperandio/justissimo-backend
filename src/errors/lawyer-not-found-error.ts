import { NotFoundError } from "./not-found-error"

export class LawyerNotFoundError extends NotFoundError {
    constructor () {
        super("Advogado não encontrado.")
    }
}