import { Router } from 'express';

import { helloRouter } from './hello.js';
import { profileRouter } from './profile.js';
import { loginRouter } from './login.js';

export const router = Router();

router.use('/hello', helloRouter);
router.use('/profile', profileRouter);
router.use('/login', loginRouter);

