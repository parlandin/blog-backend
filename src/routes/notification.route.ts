import webpush from "web-push";
import { Router, Request, Response } from "express";
import { envConfig } from "../configs/env.config";

const notificationRouter = Router();

const {
  NOTIFICATION: { PUSH_PRIVATE_KEY, PUSH_PUBLIC_KEY, PUSH_VAPID_SUBJECT },
} = envConfig;

webpush.setVapidDetails(PUSH_VAPID_SUBJECT, PUSH_PUBLIC_KEY, PUSH_PRIVATE_KEY);

notificationRouter.get("/push/public_key", (req, res) => {
  res.status(200).json({ publicKey: PUSH_PUBLIC_KEY });
});

notificationRouter.post("/push/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Hello!",
    body: "You have subscribe to  notifications.",
  });

  webpush
    .sendNotification(subscription, payload)
    .catch((error) => console.error(error));
});

notificationRouter.post("/push/unsubscribe", (req, res) => {
  const subscription = req.body;
  res.status(201).json({});

  const payload = JSON.stringify({
    title: "Goodbye!",
  });

  webpush
    .sendNotification(subscription, payload)
    .catch((error) => console.error(error));
});

export default notificationRouter;
