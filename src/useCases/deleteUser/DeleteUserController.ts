import { Request, Response} from "express";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

class DeleteUSerController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;
        
        const userUseCase = new DeleteUserUseCase;
        await userUseCase.execute(id);

        return response.status(200).json({message: "Usuário excluído com sucesso!"});
    }
}

export { DeleteUSerController}