-- CreateTable
CREATE TABLE "WordOfTheDay" (
    "date" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "sub" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "etimology" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WordOfTheDay_pkey" PRIMARY KEY ("date")
);

-- CreateIndex
CREATE UNIQUE INDEX "WordOfTheDay_word_key" ON "WordOfTheDay"("word");
