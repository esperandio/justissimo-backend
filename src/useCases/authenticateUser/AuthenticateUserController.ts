import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


class AuthenticateUserController{
    async handle(request: Request, response: Response) {
        const {email, senha} = request.body;
        const authenticateUser = new AuthenticateUserUseCase();

        const token = await authenticateUser.execute({
            email,
            password: senha,
        });

        return response.status(200).json(token);
    }
}

export { AuthenticateUserController }