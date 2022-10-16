import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { ApproveLawyerController } from "../../useCases/approveLawyer/ApproveLawyerController";
import { ListPendingLawyersController } from "../../useCases/listPendingLawyers/ListPendingLawyersController";
import { ReproveLawyerController } from "../../useCases/reproveLawyer/ReproveLawyerController";

const router = Router();

router.get('/lawyers/pending', ensureAuthenticated, new ListPendingLawyersController().handle);

router.post('/lawyers/approve', ensureAuthenticated, new ApproveLawyerController().handle);
router.post('/lawyers/reprove', ensureAuthenticated, new ReproveLawyerController().handle);

export { router as router_administrator };