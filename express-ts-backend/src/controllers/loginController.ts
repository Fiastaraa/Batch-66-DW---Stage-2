import { type Request, type Response } from 'express';

type LoginBody = {
  username: string;
  password: string;
};

export const login = (req: Request, res: Response): void => {
  const body = req.body as Partial<LoginBody>;

  const username = typeof body.username === 'string' ? body.username : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!username || !password) {
    res.status(400).json({ message: 'username and password are required' });
    return;
  }

  res.json({ message: 'Login success', username });
};

