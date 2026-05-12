import express, { type Request, type Response } from 'express';

import { router } from './routes/index.js';

const app = express();

app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.json({ message: 'Hello' });
});

app.get('/profile/:name', (req: Request, res: Response) => {
  const { name } = req.params;
  res.json({ name });
});

app.post('/login', (req: Request, res: Response) => {
  const body = req.body as { username?: string; password?: string };
  const username = body.username ?? '';
  const password = body.password ?? '';

  if (!username || !password) {
    res.status(400).json({ message: 'username and password are required' });
    return;
  }

  res.json({ message: 'Login success', username });
});

app.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'Express TypeScript API is running' });
});

app.use('/api', router);

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});

