import { Request, Response } from "express";
import { CreateUserLawyerUseCase } from "./CreateUserLawyerUseCase";

class CreateUserLawyerController {
 async handle(request: Request, response: Response) {
    const { 
        senha,
        email,
        nome,
        dt_nascimento,
        cpf,
        cnpj,
        cidade,
        estado,
        cep,
        nr_cna,
        uf_cna,
        tel_celular,
        areas
    } = request.body;

     const userResponse = await new CreateUserLawyerUseCase().execute({
        password: senha,
        email,
        fullname: nome,
        birthday: dt_nascimento,
        cpf,
        cnpj,
        city: cidade,
        state: estado,
        zipcode: cep,
        register_cna: nr_cna,
        state_cna: uf_cna,
        phone: tel_celular,
        areas
     });

     return response.status(201).json(userResponse);

 }
}

export { CreateUserLawyerController }