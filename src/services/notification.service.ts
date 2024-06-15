import { envConfig } from "../configs/env.config";
import webPush from "web-push";
import NotificationRepository, {
  Subscription,
} from "../repositories/notification.repository";

const {
  NOTIFICATION: { PUSH_PRIVATE_KEY, PUSH_PUBLIC_KEY, PUSH_VAPID_SUBJECT },
} = envConfig;

webPush.setVapidDetails(PUSH_VAPID_SUBJECT, PUSH_PUBLIC_KEY, PUSH_PRIVATE_KEY);

class NotificationService {
  static getPublicKey() {
    return PUSH_PUBLIC_KEY;
  }

  static async subscribe(subscription: any) {
    if (!subscription) {
      return "error-subscription-required";
    }

    const subscriptionExists = await this.validadeIfExist(subscription);

    if (subscriptionExists.exist) {
      return "error-subscription-exists";
    }

    await NotificationRepository.create(subscription as Subscription);

    return "success";
  }

  static async validadeIfExist(subscription: any) {
    const { keys } = subscription;
    const { auth, p256dh } = keys;

    const subscriptionExists = await NotificationRepository.findByAuth({
      auth,
      p256dh,
    });

    if (subscriptionExists) {
      return { exist: true, subscription: subscriptionExists };
    }

    return { exist: false, subscription: null };
  }

  static async unsubscribe(subscription: any) {
    if (!subscription) {
      return "error-subscription-required";
    }

    const validadeIfExist = await this.validadeIfExist(subscription);

    if (!validadeIfExist.exist) {
      return "error-subscription-not-exists";
    }

    const id = validadeIfExist.subscription?.subscriptionId;

    if (!id) {
      return "error-subscription-not-exists";
    }

    await NotificationRepository.delete(id);

    return "success";
  }

  static async sendNotification() {
    const listOfSubscriptions = await NotificationRepository.findAll();

    const payload = JSON.stringify({
      title: "Palavra do dia",
      body: "A palavra do dia já está disponível! Vem conferir!",
    });

    const promises = listOfSubscriptions.map(async (subscription) => {
      if (!subscription) {
        return;
      }
      return new Promise(async (resolve, reject) => {
        await webPush
          .sendNotification(subscription as Subscription, payload)
          .then(() => {
            resolve("Notification sent!");
          })
          .catch((error) => {
            reject(error);
          });
      });
    });

    await Promise.all(promises);

    return;
  }
}

export default NotificationService;
