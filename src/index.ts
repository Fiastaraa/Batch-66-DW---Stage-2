import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import productRoute from "./routes/product.route";
import userRoute from "./routes/user.route";

dotenv.config();

const app: Application = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(express.json());
app.use(productRoute);
app.use(userRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("API Running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
