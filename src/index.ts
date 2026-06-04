import express from 'express';
import userRoutes from './routes/userRoutes';
const app = express();
const PORT = 3000;
// Middleware untuk memparsing JSON body
app.use(express.json());
// Mendaftarkan routes
app.use('/', userRoutes);
app.listen(PORT, () => {
  console.log(`⚡ Server berjalan di http://localhost:${PORT}`);
});
