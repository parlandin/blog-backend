import NotificationService from "../services/notification.service";
import { Request, Response } from "express";

class NotificationController {
  static async subscribe(req: Request, res: Response) {
    try {
      const subscription = req.body;
      const result = await NotificationService.subscribe(subscription);

      if (result === "error-subscription-required") {
        return res.status(400).json({ message: "error-subscription-required" });
      }

      if (result === "error-subscription-exists") {
        return res.status(400).json({ message: "error-subscription-exists" });
      }

      return res.status(201).json({ message: "subscription-successful" });
    } catch (error) {
      return res.status(500).json({ message: "subscription-failed" });
    }
  }

  static async unsubscribe(req: Request, res: Response) {
    try {
      const subscription = req.body;
      await NotificationService.unsubscribe(subscription);
      return res.status(200).json({ message: "Unsubscription successful" });
    } catch (error) {
      return res.status(500).json({ message: "Unsubscription failed" });
    }
  }

  static async getPublicKey(req: Request, res: Response) {
    try {
      const publicKey = NotificationService.getPublicKey();
      return res.status(200).json({ publicKey });
    } catch (error) {
      return res.status(500).json({ message: "Failed to get public key" });
    }
  }

  static async sendNotification(req: Request, res: Response) {
    try {
      const permissionKey = req.body.permissionKey;

      if (!permissionKey) {
        return res.status(400).json({ message: "Permission key is required" });
      }

      if (permissionKey !== process.env.SEND_WORD_OF_DAY_PERMISSION_KEY) {
        return res.status(401).json({ message: "Permission denied" });
      }

      await NotificationService.sendNotification();
      return res.status(200).json({ message: "Notification sent" });
    } catch (error) {
      console.log(`Send notification error: ${error}`);
      return res.status(500).json({ message: "Failed to send notification" });
    }
  }
}

export default NotificationController;
