import { Router } from "express";
import { CreateUserClientController } from "./useCases/createUserClient/CreateUserClientController";

const router = Router();

router.post("/users", new CreateUserClientController().handle)

export { router}