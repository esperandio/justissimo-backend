import { Router } from "express";
import uploadImage from "../../config/multer";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { ConfigScheduleController } from "../../useCases/config_schedule/ConfigScheduleController";
import { CreateManualSchedulingController } from "../../useCases/createManualScheduling/CreateManualSchedulingController";
import { CreateUserLawyerController } from "../../useCases/createUserLawyer/CreateUserLawyerController";
import { ListAllLawyersController } from "../../useCases/listUserLawyer/listAllLawyers/ListAllLawyersController";
import { ListLawyerByIdController } from "../../useCases/listUserLawyer/listLawyerById/ListLawyerByIdController";
import { ReviewLawyerController } from "../../useCases/reviewLawyer/ReviewLawyerController";

const router = Router();

/**Lawyers*/
router.post('/lawyers', uploadImage.single('file'), new CreateUserLawyerController().handle);
router.get("/lawyers", new ListAllLawyersController().handle);
router.get("/lawyers/:id", new ListLawyerByIdController().handle);
router.post('/lawyers/:id/review', new ReviewLawyerController().handle);
router.post('/lawyers/config-schedule', new ConfigScheduleController().handle);
router.post("/lawyers/scheduling", ensureAuthenticated, new CreateManualSchedulingController().handle);

export { router as router_lawyers };