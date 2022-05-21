import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { AuthenticateUserController } from "../../useCases/authenticateUser/AuthenticateUserController";
import { DeleteUserController } from "../../useCases/deleteUser/DeleteUserController";

const router = Router();
/**User*/
router.delete("/user/:id", ensureAuthenticated, new DeleteUserController().handle);
router.post('/login', new AuthenticateUserController().handle);

export { router as router_user };