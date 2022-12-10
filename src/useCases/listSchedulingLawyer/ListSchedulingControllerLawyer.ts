import { Request, Response} from "express";
import { ListSchedulingUseCaseLawyer } from "./ListSchedulingUseCaseLawyer";

class ListSchedulingControllerLawyer {
    async handle(request: Request, response: Response) {
        const data_inicial   = request.query.data_inicial as string;
        const data_final = request.query.data_final as string;
        const area = request.query.area as string;
        const somenteAgendamentosEmAberto = request.query.somenteAgendamentosEmAberto as string;
        const { id } = request.params;

        const schedulings = await new ListSchedulingUseCaseLawyer().execute({
            fk_lawyer: id,
            date_init: data_inicial,
            date_final: data_final,
            area,
            somenteAgendamentosEmAberto: somenteAgendamentosEmAberto === "true" ? true : false
        });

        return response.status(200).json(schedulings);
    }
}

export { ListSchedulingControllerLawyer }