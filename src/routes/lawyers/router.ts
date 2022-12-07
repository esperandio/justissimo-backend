import { Router } from "express";
import uploadImage from "../../config/multer";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { ConfigScheduleController } from "../../useCases/config_schedule/ConfigScheduleController";
import { CreateManualSchedulingController } from "../../useCases/createManualScheduling/CreateManualSchedulingController";
import { CreateUserLawyerController } from "../../useCases/createUserLawyer/CreateUserLawyerController";
import { ListCanEvaluateController } from "../../useCases/listCanEvaluate/ListCanEvaluateController";
import { ListConfigScheduleController } from "../../useCases/listConfigSchedule/ListConfigScheduleController";
import { ListMessagesDivulgationLawyerController } from "../../useCases/listMessagesDivulgationLawyer/ListMessagesDivulgationLawyerController";
import { ListAllLawyersController } from "../../useCases/listUserLawyer/listAllLawyers/ListAllLawyersController";
import { ListLawyerByIdController } from "../../useCases/listUserLawyer/listLawyerById/ListLawyerByIdController";
import { MessageDivulgationController } from "../../useCases/messageDivulgation/MessageDivulgationController";
import { ReviewLawyerController } from "../../useCases/reviewLawyer/ReviewLawyerController";

const router = Router();

/**Lawyers*/
router.get("/lawyers", new ListAllLawyersController().handle);
router.get("/lawyers/:id(\\d+)", new ListLawyerByIdController().handle);
router.get("/lawyers/:fk_advogado/divulgation/:id", ensureAuthenticated, new ListMessagesDivulgationLawyerController().handle);
router.get("/lawyers/:id/config-schedule", ensureAuthenticated, new ListConfigScheduleController().handle);
router.get("/lawyers/pode_avaliar", ensureAuthenticated, new ListCanEvaluateController().handle);

router.post('/lawyers', uploadImage.single('file'), new CreateUserLawyerController().handle);
router.post('/lawyers/:id/review', new ReviewLawyerController().handle);
router.post('/lawyers/config-schedule', ensureAuthenticated, new ConfigScheduleController().handle);
router.post("/lawyers/scheduling", ensureAuthenticated, new CreateManualSchedulingController().handle);
router.post("/lawyers/:id_advogado/divulgation/:id_divulgacao/message", ensureAuthenticated, new MessageDivulgationController().handle);

export { router as router_lawyers };