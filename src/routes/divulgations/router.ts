import { Router } from "express";
import uploadImage from "../../config/multer";
import { ensureAuthenticated } from "../../middlewares/ensureAutheticated";
import { ListAllDivulgationController } from "../../useCases/listDivulgation/listAllDivulgationLawyers/ListAllDivulgationController";


const router = Router();

/**Divulgatons*/
router.get("/divulgations", ensureAuthenticated, new ListAllDivulgationController().handle);

export { router as router_divulgations };