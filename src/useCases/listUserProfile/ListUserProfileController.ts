import { Request, Response } from "express"
import { ListUserProfileUseCase } from "./ListUserProfileUseCase";

 class ListUserProfileController {

    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const  userProfile = await new ListUserProfileUseCase().execute( Number.parseInt(id));
    
        return  response.status(200).json(userProfile);
    }
 }

export { ListUserProfileController }
