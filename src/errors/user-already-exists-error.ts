export class UserAlreadyExistsError extends Error {
    constructor (email: string) {
        super(`Usuário já existe (email: ${email}).`)
    }
}