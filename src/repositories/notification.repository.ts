import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const { notificationPush: DB, key: keyBD } = prisma;

export interface Subscription {
  endpoint: string;
  expirationTime: number | null;
  keys: {
    auth: string;
    p256dh: string;
  };
}

class NotificationRepository {
  static async create(data: Subscription) {
    return await DB.create({
      data: {
        endpoint: data.endpoint,
        expirationTime: data.expirationTime,
        keys: {
          create: {
            auth: data.keys.auth,
            p256dh: data.keys.p256dh,
          },
        },
      },
    });
  }

  static async findAll() {
    return await DB.findMany({
      select: {
        endpoint: true,
        expirationTime: true,
        id: true,
        keys: {
          select: {
            auth: true,
            p256dh: true,
          },
        },
      },
    });
  }

  static async findByAuth(auth: Subscription["keys"]) {
    return await keyBD.findUnique({
      where: {
        auth: auth.auth,
        p256dh: auth.p256dh,
      },
      include: {
        Subscription: {
          select: {
            endpoint: true,
            expirationTime: true,
            id: true,
          },
        },
      },
    });
  }

  static async findById(id: string) {
    return await DB.findUnique({ where: { id } });
  }

  static async delete(id: string) {
    return await DB.delete({ where: { id } });
  }
}

export default NotificationRepository;
