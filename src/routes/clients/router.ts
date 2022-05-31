import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { CreateUserClientController } from "../../useCases/createUserClient/CreateUserClientController";
import { ListAllClientsController } from "../../useCases/listUserClient/listAllClients/ListAllClientsController";
import { ListClientByIdController } from "../../useCases/listUserClient/listClientById/ListClientByIdController";
import { CreateDivulgationController } from "../../useCases/createDivulgation/CreateDivulgationController";

const router = Router();

/**Clients*/
router.post("/clients", new CreateUserClientController().handle);
router.get("/clients", new ListAllClientsController().handle);
router.get("/clients/:id",ensureAuthenticated, new ListClientByIdController().handle);

router.post("/divulgations/:id", new CreateDivulgationController().handle);

export { router as router_clients };