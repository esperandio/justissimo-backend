import { Request, Response} from "express";
import { CreateUserAdvogateUseCase } from "./CreateUserAdvocateUseCase";

class CreateUserAdvocateController {
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

     const userResponse = await new CreateUserAdvogateUseCase().execute({
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

export { CreateUserAdvocateController }