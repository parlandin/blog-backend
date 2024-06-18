import { Router } from "express";
import NotificationController from "../controllers/notification.controller";
import { onlyAllowCorsInMyClient } from "../middlewares/cors";

const notificationRouter = Router();

notificationRouter.get(
  "/push/public_key",
  onlyAllowCorsInMyClient,
  NotificationController.getPublicKey
);

notificationRouter.post("/push/send", NotificationController.sendNotification);

notificationRouter.post(
  "/push/subscribe",
  onlyAllowCorsInMyClient,
  NotificationController.subscribe
);

notificationRouter.post(
  "/push/unsubscribe",
  onlyAllowCorsInMyClient,
  NotificationController.unsubscribe
);

//TODO: create a controller method to get the subscription count
notificationRouter.get(
  "/push/subscription-count",
  onlyAllowCorsInMyClient,
  (_, res) => {
    res.json({ count: 5 });
  }
);

export default notificationRouter;
