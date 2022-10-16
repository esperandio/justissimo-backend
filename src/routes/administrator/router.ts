import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { AproveLawyerController } from "../../useCases/aproveLawyer/AproveLawyerController";
import { ListPendingLawyersController } from "../../useCases/listPendingLawyers/ListPendingLawyersController";

const router = Router();

router.get('/lawyers/pending', ensureAuthenticated, new ListPendingLawyersController().handle);

router.post('/lawyers/aprove', ensureAuthenticated, new AproveLawyerController().handle);

export { router as router_administrator };