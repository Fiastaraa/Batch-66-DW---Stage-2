import { type Request, type Response } from 'express';

type ProfileParams = {
  name: string;
};

export const getProfile = (req: Request<ProfileParams>, res: Response): void => {
  const { name } = req.params;
  res.json({ name });
};


