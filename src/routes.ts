import { Router } from "express";
import { CreateUserAdvocateController } from "./useCases/createUserAdvocate/CreateUserAdvocateController";
import { CreateUserClientController } from "./useCases/createUserClient/CreateUserClientController";
import { DeleteUSerController } from "./useCases/deleteUser/DeleteUserController";
import { ListAllClientsController } from "./useCases/listUserClient/listAllClients/ListAllClientsController";
import { ListClientByIdController } from "./useCases/listUserClient/listClientById/ListClientByIdController";

const router = Router();

router.post("/clients", new CreateUserClientController().handle);
router.get("/clients", new ListAllClientsController().handle);
router.get("/clients/:id", new ListClientByIdController().handle);
router.delete("/user/:id", new DeleteUSerController().handle);
router.post('/lawyers', new CreateUserAdvocateController().handle);

export { router }