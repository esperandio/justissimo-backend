import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { CloseSchedulingController } from "../../useCases/closeScheduling/CloseSchedulingController";
import { ListHoursForSchedulingController } from "../../useCases/listHoursForScheduling/ListHoursSchedulingController";
import { ListSchedulingController } from "../../useCases/listScheduling/ListSchedulingController";

const router = Router();

/**Schedulings*/
router.get("/schedulings/:id", ensureAuthenticated , new ListSchedulingController().handle);

/**hours Available - Schedulings*/
router.get("/hour-schedulings/:id", ensureAuthenticated , new ListHoursForSchedulingController().handle);

/**Delete - Scheduling*/
router.delete("/scheduling", ensureAuthenticated , new CloseSchedulingController().handle);

export { router as router_schedulings };