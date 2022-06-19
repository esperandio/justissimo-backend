import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { CloseSchedulingController } from "../../useCases/closeScheduling/CloseSchedulingController";
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

/**Delete - Scheduling*/
router.delete("/scheduling", ensureAuthenticated , new CloseSchedulingController().handle);

export { router as router_schedulings };