import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import productRoute from "./routes/product.route";
import userRoute from "./routes/user.route";
import transferRoute from "./routes/transfer.route";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { apiKeyMiddleware } from "./middlewares/apiKey.middleware";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";

dotenv.config();

const app: Application = express();
const PORT = Number(process.env.PORT) || 5004;

app.use(express.json());
app.use(loggerMiddleware);
app.use(apiKeyMiddleware);

app.use(productRoute);
app.use(userRoute);
app.use(transferRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("API Running...");
});

// Global error handler (must be last)
app.use(errorHandlerMiddleware);

app.listen(5004, () => {
  console.log(`Server running on http://localhost:5004`);
});

