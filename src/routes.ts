import { request, response, Router } from "express";
import { CreateUserLawyerController } from "./useCases/createUserLawyer/CreateUserLawyerController";
import { CreateUserClientController } from "./useCases/createUserClient/CreateUserClientController";
import { DeleteUserController } from "./useCases/deleteUser/DeleteUserController";
import { ListAllClientsController } from "./useCases/listUserClient/listAllClients/ListAllClientsController";
import { ListClientByIdController } from "./useCases/listUserClient/listClientById/ListClientByIdController";
import { ListAllLawyersController } from "./useCases/listUserLawyer/listAllLawyers/ListAllLawyersController";
import { ListLawyerByIdController } from "./useCases/listUserLawyer/listLawyerById/ListLawyerByIdController";
import { ReviewLawyerController } from "./useCases/reviewLawyer/ReviewLawyerController";
import { AuthenticateUserController } from "./useCases/authenticateUser/AuthenticateUserController";
import { ensureAuthenticated } from "./middlewares/ensureAutheticated";

const router = Router();

/**User*/
router.delete("/user/:id", ensureAuthenticated, new DeleteUserController().handle);
router.post('/login', new AuthenticateUserController().handle);
/**Clients*/
router.post("/clients", new CreateUserClientController().handle);
router.get("/clients", new ListAllClientsController().handle);
router.get("/clients/:id", new ListClientByIdController().handle);
/**Lawyers*/
router.post('/lawyers', new CreateUserLawyerController().handle);
router.get("/lawyers", new ListAllLawyersController().handle);
router.get("/lawyers/:id", new ListLawyerByIdController().handle);
router.post('/lawyers/:id/review', new ReviewLawyerController().handle);

export { router }