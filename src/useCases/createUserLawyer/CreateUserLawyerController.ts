import { Request, Response } from "express";
import { CreateUserLawyerUseCase } from "./CreateUserLawyerUseCase";

class CreateUserLawyerController {
 async handle(request: Request, response: Response) {
    let url_image = "";

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
        areas,
        info
    } = request.body;
 
    const values = await Object.entries(request.file || {});
    await values.find(([key, value]) => {
        if (key === "location") {
            url_image = value;
        } 
    });

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
        areas: JSON.parse(areas),
        info,
        url_image
     });

     return response.status(201).json(userResponse);

 }
}

export { CreateUserLawyerController }