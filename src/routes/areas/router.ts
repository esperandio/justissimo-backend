import { Router } from "express";
import { ListAllAreasController } from "../../useCases/listAllAreas/ListAllAreasController";

const router = Router();

router.get("/areas", new ListAllAreasController().handle);

export { router as router_areas };