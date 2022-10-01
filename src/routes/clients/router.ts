import { Router } from "express";
import uploadImage from "../../config/multer";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { CreateUserClientController } from "../../useCases/createUserClient/CreateUserClientController";
import { ListAllClientsController } from "../../useCases/listUserClient/listAllClients/ListAllClientsController";
import { ListClientByIdController } from "../../useCases/listUserClient/listClientById/ListClientByIdController";
import { CreateDivulgationController } from "../../useCases/createDivulgation/CreateDivulgationController";
import { CreateSchedulingController } from "../../useCases/createScheduling/CreateSchedulingController";
import { ListAllDivulgationController } from "../../useCases/listDivulgation/listDivulgationClient/ListAlldivulgationControler";
import { ListMessagesDivulgationController } from "../../useCases/listMessagesDivulgation/ListMessagesDivulgationClientController";

const router = Router();

/**Clients*/
router.get("/clients", new ListAllClientsController().handle);
router.get("/clients/:id",ensureAuthenticated, new ListClientByIdController().handle);
router.get("/clients/divulgations/:id",ensureAuthenticated, new ListAllDivulgationController().handle);
router.get("/clients/divulgation/:id",ensureAuthenticated, new ListMessagesDivulgationController().handle);

router.post("/clients", uploadImage.single('file'), new CreateUserClientController().handle) ;
router.post("/clients/:id/divulgations", new CreateDivulgationController().handle);
router.post("/clients/scheduling", ensureAuthenticated, new CreateSchedulingController().handle);

export { router as router_clients };