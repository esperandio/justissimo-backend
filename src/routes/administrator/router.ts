import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { ApproveLawyerController } from "../../useCases/aproveLawyer/ApproveLawyerController";
import { ListPendingLawyersController } from "../../useCases/listPendingLawyers/ListPendingLawyersController";

const router = Router();

router.get('/lawyers/pending', ensureAuthenticated, new ListPendingLawyersController().handle);

router.post('/lawyers/approve', ensureAuthenticated, new ApproveLawyerController().handle);

export { router as router_administrator };