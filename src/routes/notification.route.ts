import { Router } from "express";
import NotificationController from "../controllers/notification.controller";

const notificationRouter = Router();

notificationRouter.get("/push/public_key", NotificationController.getPublicKey);

notificationRouter.post("/push/send", NotificationController.sendNotification);

notificationRouter.post("/push/subscribe", NotificationController.subscribe);

notificationRouter.post(
  "/push/unsubscribe",
  NotificationController.unsubscribe
);

export default notificationRouter;
