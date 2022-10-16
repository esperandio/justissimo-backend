import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { ListPendingLawyersController } from "../../useCases/listPendingLawyers/ListPendingLawyersController";

const router = Router();

router.get('/lawyers/pending', ensureAuthenticated, new ListPendingLawyersController().handle);

export { router as router_administrator };