import { Router } from "express";
import wordOfTheDayRoute from "./wordOfTheDay.route";
import notificationRouter from "./notification.route";

const allRoutes = Router();

allRoutes.get("/", (req, res) => {
  res.send("api is running");
});

allRoutes.use("/get-word", wordOfTheDayRoute);
allRoutes.use("/notification", notificationRouter);

export default allRoutes;
