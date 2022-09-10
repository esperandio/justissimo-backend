
import { Request, Response } from "express"
import { UpadateProfileUseCase } from "./UpdateProfileUseCase";

class UpadateProfileController {

  async handle(request: Request, response: Response): Promise<Response> {
    const  id  = request.params.id;
    const { nome, email, cnpj, cpf, dt_nascimento, cidade , estado, cep} = request.body;
    
    let url_image = "";
    
    const values = Object.entries(request.file || {});
    
    values.find(([key, value]) => {
        if (key === "location") {
            url_image = value;
        } 
    });

    const user = await new UpadateProfileUseCase().execute({
        user_id: Number.parseInt(id),
        email  : email,
        fullname: nome,
        cnpj,
        cpf,
        birthday: dt_nascimento,
        city: cidade,
        state: estado,
        zip_code: cep,
        url_image: url_image,
    });

    return response.json(user);
  }
}

export { UpadateProfileController }