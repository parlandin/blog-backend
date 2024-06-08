import express from "express";
import allRoutes from "./routes/allRoutes.route";
import cors from "./middlewares/cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(allRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
