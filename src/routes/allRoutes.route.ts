import { Router } from "express";
import dayRoute from "./dayWord.route";
import notificationRouter from "./notification.route";

const allRoutes = Router();

allRoutes.get("/", (req, res) => {
  res.send("api is running");
});

allRoutes.use("/get-word", dayRoute);
allRoutes.use("/notification", notificationRouter);

export default allRoutes;
