import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { AuthenticateUserController } from "../../useCases/authenticateUser/AuthenticateUserController";
import { DeleteUserController } from "../../useCases/deleteUser/DeleteUserController";
import { GeneratePasswordRecoveryCodeController } from "../../useCases/generatePasswordRecoveryCode/GeneratePasswordRecoveryCodeController";
import { ValidatePasswordRecoveryCodeController } from "../../useCases/validatePasswordRecoveryCode/ValidatePasswordRecoveryCodeController";
import { ChangePasswordController } from "../../useCases/changePassword/ChangePasswordController";

const router = Router();
/**User*/
router.delete("/user/:id", ensureAuthenticated, new DeleteUserController().handle);
router.post("/login", new AuthenticateUserController().handle);
router.post("/login/recovery", new GeneratePasswordRecoveryCodeController().handle);
router.get("/login/recovery/:recoveryCode", new ValidatePasswordRecoveryCodeController().handle);
router.post("/login/recovery/newpassword", new ChangePasswordController().handle);

export { router as router_user };