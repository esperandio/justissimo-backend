import { Router } from "express";
import { CreateUserClientController } from "./useCases/createUserClient/CreateUserClientController";
import { ListAllClientsController } from "./useCases/ListClient/ListAllClients/ListAllClientsController";

const router = Router();

router.post("/clients", new CreateUserClientController().handle);
router.get("/clients", new ListAllClientsController().handle)

export { router}