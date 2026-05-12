import { Router } from 'express';

import { login } from '../controllers/loginController.js';

export const loginRouter = Router();

loginRouter.post('/', login);


