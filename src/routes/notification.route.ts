import webpush from "web-push";
import { Router, Request, Response } from "express";

const notificationRouter = Router();

const key = {
  publicKey: "",
  privateKey: "",
};

webpush.setVapidDetails("mailto:parlandim", key.publicKey, key.privateKey);

notificationRouter.get("/push/public_key", (req, res) => {
  res.status(200).json({ publicKey: key.publicKey });
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
