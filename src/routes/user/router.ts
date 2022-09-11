import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { AuthenticateUserController } from "../../useCases/authenticateUser/AuthenticateUserController";
import { DeleteUserController } from "../../useCases/deleteUser/DeleteUserController";
import { GeneratePasswordRecoveryCodeController } from "../../useCases/generatePasswordRecoveryCode/GeneratePasswordRecoveryCodeController";
import { ValidatePasswordRecoveryCodeController } from "../../useCases/validatePasswordRecoveryCode/ValidatePasswordRecoveryCodeController";
import { ChangePasswordController } from "../../useCases/changePassword/ChangePasswordController";
import { ListUserProfileController } from "../../useCases/listUserProfile/ListUserProfileController";
import { UpadateProfileController } from "../../useCases/updateProfile/UpdateProfileController";
import uploadImage from "../../config/multer";

const router = Router();
/**User*/
router.delete("/user/:id", ensureAuthenticated, new DeleteUserController().handle);
router.get("/user/:id", ensureAuthenticated, new ListUserProfileController().handle);
router.post("/login", new AuthenticateUserController().handle);
router.post("/login/recovery", new GeneratePasswordRecoveryCodeController().handle);
router.get("/login/recovery/:codigo_recuperacao", new ValidatePasswordRecoveryCodeController().handle);
router.post("/login/recovery/newpassword", new ChangePasswordController().handle);
router.put("/user/:id", ensureAuthenticated, uploadImage.single('file'),  new UpadateProfileController().handle);

export { router as router_user };