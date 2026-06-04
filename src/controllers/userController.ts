import { Request, Response } from 'express';

// GET /hello
export const getHello = (req: Request, res: Response): void => {
  res.status(200).json({
    message: 'Hello World'
  });
};

// GET /profile/:name
export const getProfile = (req: Request<{ name: string }>, res: Response): void => {
  const { name } = req.params;
  
  res.status(200).json({
    message: `Ini adalah halaman profil milik ${name}`,
    name: name
  });
};

// Interface untuk request body POST /login
interface LoginBody {
  username?: string;
  password?: string;
}

// POST /login
export const login = (req: Request<Record<string, never>, unknown, LoginBody>, res: Response): void => {
  console.log('\n--- 📥 Request Login Masuk ---');
  console.log('Content-Type Header:', req.headers['content-type']);
  console.log('Body yang Diterima:', req.body);

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      message: 'Username dan password wajib diisi!'
    });
    return;
  }

  // Contoh logic verifikasi sederhana
  if (username === 'fia' && password === 'bootcamp123') {
    res.status(200).json({
      message: 'Login berhasil!',
      user: {
        username: username,
        role: 'Student'
      }
    });
  } else {
    res.status(401).json({
      message: 'Login gagal! Username atau password salah.'
    });
  }
};
