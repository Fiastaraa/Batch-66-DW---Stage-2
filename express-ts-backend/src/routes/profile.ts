import { Router, type Request, type Response } from 'express';

import { getProfile } from '../controllers/profileController.js';

type ProfileParams = {
  name: string;
};

type ProfileReq = Request<ProfileParams>;

export const profileRouter = Router();

profileRouter.get('/:name', (req: ProfileReq, res: Response) => getProfile(req, res));


