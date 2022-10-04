import { Router } from "express";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { CloseDivulgationController } from "../../useCases/closeDivulgation/CloseDivulgationController";
import { ListAllDivulgationController } from "../../useCases/listDivulgation/listAllDivulgationLawyers/ListAllDivulgationController";


const router = Router();

/**Divulgatons*/
router.get("/divulgations", ensureAuthenticated, new ListAllDivulgationController().handle);

router.put("/divulgations/:id_divulgacao", ensureAuthenticated, new CloseDivulgationController().handle);

export { router as router_divulgations };