import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const { wordOfTheDay: DB } = prisma;

interface WordOfTheDay {
  date: string;
  word: string;
  sub: string;
  meanings: string[];
  etimology: string;
  image: string | null;
}

export const createWordOfTheDay = async (data: WordOfTheDay) => {
  const wordOfTheDay = await DB.create({
    data,
  });
  return wordOfTheDay;
};

export const getWordOfTheDay = async (date: string) => {
  const wordOfTheDay = await DB.findFirst({
    where: {
      date,
    },

    select: {
      date: true,
      word: true,
      sub: true,
      meanings: true,
      etimology: true,
      image: true,
    },
  });

  return wordOfTheDay;
};
