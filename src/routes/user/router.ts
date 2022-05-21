import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { AuthenticateUserController } from "../../useCases/authenticateUser/AuthenticateUserController";
import { DeleteUserController } from "../../useCases/deleteUser/DeleteUserController";
import { PasswordRecoveryController } from "../../useCases/passwordRecovery/PasswordRecoveryController";
import { ValidatePasswordRecoveryCodeController } from "../../useCases/validatePasswordRecoveryCode/ValidatePasswordRecoveryCodeController";

const router = Router();
/**User*/
router.delete("/user/:id", ensureAuthenticated, new DeleteUserController().handle);
router.post('/users/password/recovery', new PasswordRecoveryController().handle);
router.get("/users/password/recovery/:recoveryCode", new ValidatePasswordRecoveryCodeController().handle);
router.post('/login', new AuthenticateUserController().handle);

export { router as router_user };