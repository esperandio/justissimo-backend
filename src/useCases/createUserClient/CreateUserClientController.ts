import { Request, Response} from "express";
import { CreateUserClientUseCase } from "./CreateUserClientUseCase";

class CreateUserClientController {
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
            cep 
        } = request.body;
        
        const values = await Object.entries(request.file || {});
        await values.find(([key, value]) => {
            if (key === "location") {
                url_image = value;
            } 
        });
        
        const userResponse = await new CreateUserClientUseCase().execute({
            password: senha,
            email,
            fullname: nome,
            birthday: dt_nascimento,
            cpf,
            cnpj,
            city: cidade,
            state: estado,
            zipcode: cep,
            url_image
        });

        return response.status(201).json(userResponse);
    }
}

export { CreateUserClientController }