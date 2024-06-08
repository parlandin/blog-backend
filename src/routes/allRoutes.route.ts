import { Router } from "express";
import dayRoute from "./dayWord.route";

const allRoutes = Router();

allRoutes.get("/", (req, res) => {
  res.send("api is running");
});

allRoutes.use("/get-word", dayRoute);

export default allRoutes;
