import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { ListHoursForSchedulingController } from "../../useCases/listHoursForScheduling/ListHoursSchedulingController";
import { ListSchedulingController } from "../../useCases/listScheduling/ListSchedulingController";

const router = Router();

/**Schedulings*/
router.get("/schedulings/:id", ensureAuthenticated , new ListSchedulingController().handle);

/**hours Available - Schedulings*/
router.get("/hour-schedulings/:id", ensureAuthenticated , new ListHoursForSchedulingController().handle);

export { router as router_schedulings };