import { Router } from "express";
import multer from "multer";
import uploadImage from "../../config/multer";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { CreateUserClientController } from "../../useCases/createUserClient/CreateUserClientController";
import { ListAllClientsController } from "../../useCases/listUserClient/listAllClients/ListAllClientsController";
import { ListClientByIdController } from "../../useCases/listUserClient/listClientById/ListClientByIdController";
import { CreateDivulgationController } from "../../useCases/createDivulgation/CreateDivulgationController";
import { CreateSchedulingController } from "../../useCases/createScheduling/CreateSchedulingController";
import encrypt from "../../config/utils/crypto";

const router = Router();

/**Clients*/
router.post("/clients", uploadImage.single('file'), new CreateUserClientController().handle) ;
router.get("/clients", new ListAllClientsController().handle);
router.get("/clients/:id",ensureAuthenticated, new ListClientByIdController().handle);

router.post("/clients/:id/divulgations", new CreateDivulgationController().handle);
router.post("/clients/scheduling", ensureAuthenticated, new CreateSchedulingController().handle);

export { router as router_clients };