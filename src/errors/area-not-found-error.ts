import { NotFoundError } from "./not-found-error"

export class AreaNotFoundError extends NotFoundError {
    constructor (id: number) {
        super(`Área de atuação não encontrada (valor: ${id})`)
    }
}