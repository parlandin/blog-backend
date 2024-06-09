declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;

      NOTIFICATION_PUSH_PUBLIC_KEY: string;
      NOTIFICATION_PUSH_PRIVATE_KEY: string;
      NOTIFICATION_PUSH_VAPID_SUBJECT: string;

      FRONTEND_URL: string;

      SCRAPPER_WORD_OF_DAY_URL: string;

      NODE_ENV: "development" | "production";
    }
  }
}

export {};
