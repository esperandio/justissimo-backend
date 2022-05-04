import { Router } from "express";
import { CreateUserClientController } from "./useCases/createUserClient/CreateUserClientController";

const router = Router();

router.post("/clients", new CreateUserClientController().handle)

export { router}