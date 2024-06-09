import express from "express";
import allRoutes from "./routes/allRoutes.route";
import cors from "./middlewares/cors";
import { envConfig } from "./configs/env.config";

const app = express();
const PORT = envConfig.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(allRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
