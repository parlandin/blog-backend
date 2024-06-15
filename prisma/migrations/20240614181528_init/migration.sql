/*
  Warnings:

  - You are about to drop the `Subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Key" DROP CONSTRAINT "Key_subscriptionId_fkey";

-- DropTable
DROP TABLE "Subscription";

-- CreateTable
CREATE TABLE "NotificationPush" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "expirationTime" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationPush_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPush_endpoint_key" ON "NotificationPush"("endpoint");

-- AddForeignKey
ALTER TABLE "Key" ADD CONSTRAINT "Key_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "NotificationPush"("id") ON DELETE CASCADE ON UPDATE CASCADE;
