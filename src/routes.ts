import { Router } from "express";
import { CreateUserAdvocateController } from "./useCases/createUserLawyer/CreateUserAdvocateController";
import { CreateUserClientController } from "./useCases/createUserClient/CreateUserClientController";
import { DeleteUSerController } from "./useCases/deleteUser/DeleteUserController";
import { ListAllClientsController } from "./useCases/listUserClient/listAllClients/ListAllClientsController";
import { ListClientByIdController } from "./useCases/listUserClient/listClientById/ListClientByIdController";
import { ListAllLawyersController } from "./useCases/listUserLawyer/listAllLawyers/ListAllLawyersController";
import { ListLawyerByIdController } from "./useCases/listUserLawyer/listLawyerById/ListLawyerByIdController";

const router = Router();

router.post("/clients", new CreateUserClientController().handle);
router.post('/lawyers', new CreateUserAdvocateController().handle);
router.get("/clients", new ListAllClientsController().handle);
router.get("/lawyers", new ListAllLawyersController().handle);
router.get("/clients/:id", new ListClientByIdController().handle);
router.get("/lawyers/:id", new ListLawyerByIdController().handle);
router.delete("/user/:id", new DeleteUSerController().handle);

export { router }