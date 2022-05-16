import { Request, Response } from "express";
import { CreateUserLawyerUseCase } from "./CreateUserLawyerUseCase";

class CreateUserLawyerController {
 async handle(request: Request, response: Response) {
    const { 
        password,
        email,
        fullname,
        birthday,
        cpf,
        cnpj,
        city,
        state,
        zipcode,
        register_cna,
        state_cna,
        phone,
    } = request.body;

     const userResponse = await new CreateUserLawyerUseCase().execute({
        password,
        email,
        fullname,
        birthday,
        cpf,
        cnpj,
        city,
        state,
        zipcode,
        register_cna,
        state_cna,
        phone
     });

     return response.status(201).json(userResponse);

 }
}

export { CreateUserLawyerController }