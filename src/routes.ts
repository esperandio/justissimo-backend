import { Router } from "express";
import { CreateUserLawyerController } from "./useCases/createUserLawyer/CreateUserLawyerController";
import { CreateUserClientController } from "./useCases/createUserClient/CreateUserClientController";
import { DeleteUSerController } from "./useCases/deleteUser/DeleteUserController";
import { ListAllClientsController } from "./useCases/listUserClient/listAllClients/ListAllClientsController";
import { ListClientByIdController } from "./useCases/listUserClient/listClientById/ListClientByIdController";
import { ListAllLawyersController } from "./useCases/listUserLawyer/listAllLawyers/ListAllLawyersController";
import { ListLawyerByIdController } from "./useCases/listUserLawyer/listLawyerById/ListLawyerByIdController";
import { ReviewLawyerController } from "./useCases/reviewLawyer/ReviewLawyerController";
import { PasswordRecoveryController } from "./useCases/passwordRecovery/PasswordRecoveryController";
import { ValidatePasswordRecoveryCodeController } from "./useCases/validatePasswordRecoveryCode/ValidatePasswordRecoveryCodeController";

const router = Router();

router.post("/clients", new CreateUserClientController().handle);
router.post('/lawyers', new CreateUserLawyerController().handle);
router.post('/lawyers/:id/review', new ReviewLawyerController().handle);
router.post('/users/password/recovery', new PasswordRecoveryController().handle);
router.get("/clients", new ListAllClientsController().handle);
router.get("/lawyers", new ListAllLawyersController().handle);
router.get("/clients/:id", new ListClientByIdController().handle);
router.get("/lawyers/:id", new ListLawyerByIdController().handle);
router.get("/users/password/recovery/:recoveryCode", new ValidatePasswordRecoveryCodeController().handle);
router.delete("/user/:id", new DeleteUSerController().handle);

export { router }