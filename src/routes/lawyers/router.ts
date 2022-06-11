import { Router } from "express";
import { ConfigScheduleController } from "../../useCases/config_schedule/ConfigScheduleController";
import { CreateUserLawyerController } from "../../useCases/createUserLawyer/CreateUserLawyerController";
import { ListAllLawyersController } from "../../useCases/listUserLawyer/listAllLawyers/ListAllLawyersController";
import { ListLawyerByIdController } from "../../useCases/listUserLawyer/listLawyerById/ListLawyerByIdController";
import { ReviewLawyerController } from "../../useCases/reviewLawyer/ReviewLawyerController";

const router = Router();

/**Lawyers*/
router.post('/lawyers', new CreateUserLawyerController().handle);
router.get("/lawyers", new ListAllLawyersController().handle);
router.get("/lawyers/:id", new ListLawyerByIdController().handle);
router.post('/lawyers/:id/review', new ReviewLawyerController().handle);
router.post('/lawyers/config-schedule', new ConfigScheduleController().handle);

export { router as router_lawyers };