import { Router } from "express";
import { CreateUserClientController } from "../../useCases/createUserClient/CreateUserClientController";
import { ListAllClientsController } from "../../useCases/listUserClient/listAllClients/ListAllClientsController";
import { ListClientByIdController } from "../../useCases/listUserClient/listClientById/ListClientByIdController";

const router = Router();

/**Clients*/
router.post("/clients", new CreateUserClientController().handle);
router.get("/clients", new ListAllClientsController().handle);
router.get("/clients/:id", new ListClientByIdController().handle);

export { router as router_clients };