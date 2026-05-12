import { Router } from 'express';

import { hello } from '../controllers/helloController.js';

export const helloRouter = Router();

helloRouter.get('/', hello);


