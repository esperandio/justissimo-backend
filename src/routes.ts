import { Router } from "express";
import { CreateUserClientController } from "./useCases/createUserClient/CreateUserClientController";
import { ListAllClientsController } from "./useCases/ListUserClient/ListAllClients/ListAllClientsController";
import { ListClientByIdController } from "./useCases/ListUserClient/ListClientById/ListClientByIdController";

const router = Router();

router.post("/clients", new CreateUserClientController().handle);
router.get("/clients", new ListAllClientsController().handle);
router.get("/client/:id", new ListClientByIdController().handle);

export { router}