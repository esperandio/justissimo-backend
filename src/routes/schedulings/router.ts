import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { ListHoursForSchedulingController } from "../../useCases/listHoursForScheduling/ListHoursSchedulingController";
import { ListSchedulingControllerLawyer } from "../../useCases/listSchedulingLawyer/ListSchedulingControllerLawyer";
import { ListSchedulingControllerClient } from "../../useCases/listSchedulingClients/ListSchedulingControllerClient";

const router = Router();

/**Schedulings - Lawyers*/
router.get("/schedulings/lawyer/:id", ensureAuthenticated , new ListSchedulingControllerLawyer().handle);

/**Schedulings - CLients*/
router.get("/schedulings/client/:id", ensureAuthenticated , new ListSchedulingControllerClient().handle);

/**hours Available - Schedulings*/
router.get("/hour-schedulings/:id", ensureAuthenticated , new ListHoursForSchedulingController().handle);

export { router as router_schedulings };