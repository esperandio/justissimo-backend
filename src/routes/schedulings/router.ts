import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { ListSchedulingController } from "../../useCases/listScheduling/ListSchedulingController";

const router = Router();

/**Clients*/
router.get("/schedulings/:id", ensureAuthenticated , new ListSchedulingController().handle);

export { router as router_schedulings };