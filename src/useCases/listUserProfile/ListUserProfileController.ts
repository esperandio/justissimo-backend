import { Request, Response } from "express"
import { ListUserProfileUseCase } from "./ListUserProfileUseCase";

 class ListUserProfileController {

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const type_user = request.query.tipo_usuario as string;

        console.log(id);
        console.log(type_user);
        const  userProfile = await new ListUserProfileUseCase().execute( Number.parseInt(id), type_user);
    
        return  response.json(userProfile);
    }
 }

export { ListUserProfileController }
