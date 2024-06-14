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
    const payload = JSON.stringify({
      title: "Parece que deu tudo certo!",
      body: "Você agora está inscrito para receber a palavra do dia diariamente! as 8h da manhã!",
    });

    if (!subscription) {
      return;
    }

    const subscriptionExists = await this.validadeIfExist(subscription);

    if (subscriptionExists.exist) {
      return;
    }

    await NotificationRepository.create(subscription as Subscription);

    await webPush.sendNotification(subscription, payload);

    return;
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
    const message = { message: "Subscription not found" };

    if (!subscription) {
      return message;
    }

    const validadeIfExist = await this.validadeIfExist(subscription);

    if (!validadeIfExist.exist) {
      return message;
    }

    const id = validadeIfExist.subscription?.id;

    if (!id) {
      return message;
    }

    await NotificationRepository.delete(id);

    return { message: "Subscription deleted" };
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
