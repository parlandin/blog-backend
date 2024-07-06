export const envConfig = {
  PORT: process.env.PORT || 3000,
  CLIENT_URL: process.env.FRONTEND_URL || "",

  NOTIFICATION: {
    PUSH_PUBLIC_KEY: process.env.NOTIFICATION_PUSH_PUBLIC_KEY || "",
    PUSH_PRIVATE_KEY: process.env.NOTIFICATION_PUSH_PRIVATE_KEY || "",
    PUSH_VAPID_SUBJECT: process.env.NOTIFICATION_PUSH_VAPID_SUBJECT || "",
  },
  DATABASE: {
    URI: process.env.DATABASE_URI || "",
  },
  MONGO_URL: process.env.MONGO_URL || "",

  SCRAPPER: {
    WORD_OF_DAY_URL: process.env.SCRAPPER_WORD_OF_DAY_URL || "",
  },
};
