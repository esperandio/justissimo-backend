import { Router } from 'express';

import { ensureAuthenticated } from '../../middlewares/ensureAutheticated';
import { MessageController } from '../../useCases/message/MessageController';

const router = Router();

router.post('/user/:id_usuario/message', ensureAuthenticated, new MessageController().handle);

export { router as router_messages };