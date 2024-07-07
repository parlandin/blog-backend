import { Router } from "express";
import wordOfTheDayRoute from "./wordOfTheDay.route";
import notificationRouter from "./notification.route";
import visitsRouter from "./visits.route";

const allRoutes = Router();

allRoutes.get("/", (_req, res) => {
  res.send("api is running");
});

allRoutes.use("/get-word", wordOfTheDayRoute);
allRoutes.use("/notification", notificationRouter);
allRoutes.use("/views", visitsRouter);

export default allRoutes;
